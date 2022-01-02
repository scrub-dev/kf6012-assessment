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

        $email = $this->get_request()->get_parameter("email");
        $password = $this->get_request()->get_parameter("password");

        if(!is_null($email) && !is_null($password)){
            $this->get_gateway()->find_password($email);
            if(count($this->get_gateway()->get_result()) === 1){
                $h_password = $this->get_gateway()->get_result()[0]['password'];
                $id = $this->get_gateway()->get_result()[0]['id'];

                $key = SECRET_KEY;
                $payload = Array("user_id" => $id, "exp"=> time() + 7776000);
                $jwt = JWT::encode($payload, $key, 'HS256');
                
                if(password_verify($password, $h_password)) $data['token'] = $jwt;
            }
        }

        if(!array_key_exists('token', $data)){
            $this->send_unauthorised();
        }

        return $data;
    }
}