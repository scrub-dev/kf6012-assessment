<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Firebase\JWT\JWT;
use Src\Gateways\AuthenticationGateway;
/**
 * Authentication Controller
 * Accepts: POST
 * Params: email, password
 * @author: Scott Donaldson 19019810
 */
class AuthenticationController extends Controller{
    protected function set_gateway(){
      $this->gateway = new AuthenticationGateway();
    }
    protected function process_request(){
        $data = [];

        if($this->get_request()->get_request_method() !== "POST"){
            $this->send_method_not_allowed();
        }

        $expired = $this->get_request()->get_parameter("expired");

        if(!is_null($expired)){
            try{
                $decoded = JWT::decode($expired, SECRET_KEY, array('HS256'));
            }catch(\Exception $e){
                if($e->getMessage() == "Expired token") {
                    return ["expired" => true];
                }
            }
            return ["expired" => false];
        }

        $email = $this->get_request()->get_parameter("email");
        $password = $this->get_request()->get_parameter("password");
        $create = $this->get_request()->get_parameter("create");



        //Check if email and password are set
        if(!is_null($email) && !is_null($password)){
            
            //Check if create is set
            if(!is_null($create) && $email !== '' && $password !== ''){
                //Error and return if email to create already exists in database
                if($this->get_gateway()->does_email_exist($email)){
                    $this->get_response()->set_message($this->get_gateway()->does_email_exist($email));
                    $this->get_response()->set_status_code(401);
                    return $this->get_response();
                }
                //Generate hashed password
                $hashed_pass = password_hash($password, PASSWORD_BCRYPT);
                $this->get_gateway()->create_account($email, $hashed_pass);
            }

            //find hashed password in database
            $this->get_gateway()->find_password($email);
            //make sure password exists
            if(count($this->get_gateway()->get_result()) === 1){
                $h_password = $this->get_gateway()->get_result()[0]['password'];
                $id = $this->get_gateway()->get_result()[0]['id'];

                //encode JWT
                $key = SECRET_KEY;
                $payload = Array("user_id" => $id, "exp"=> time() + 7776000);
                $jwt = JWT::encode($payload, $key, 'HS256');
                //verify password
                if(password_verify($password, $h_password)) $data['token'] = $jwt;
            }
        }

        //if key does not exist, means password failed or wrong data sent
        if(!array_key_exists('token', $data)){
            $this->send_unauthorised();
        }

        return $data;
    }
}