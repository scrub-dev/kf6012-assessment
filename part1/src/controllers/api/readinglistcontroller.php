<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Firebase\JWT\JWT;
use Src\Firebase\JWT\Key;
use Src\Gateways\ReadinglistGateway;
/**
 * Authentication Controller
 * Accepts: POST
 * Params: email, password
 * @author: Scott Donaldson 19019810
 */
class ReadinglistController extends Controller{
    protected function set_gateway(){
        $this->gateway = new ReadinglistGateway();
    }
    protected function process_request(){
        //ensure request is post
        if($this->get_request()->get_request_method() !== "POST"){
            $this->send_method_not_allowed();
        }

        $token = $this->get_request()->get_parameter('token');
        $add = $this->get_request()->get_parameter('add');
        $remove = $this->get_request()->get_parameter('remove');
        $exists = $this->get_request()->get_parameter('exists');

        //ensure a token exists
        if(is_null($token)){
            $this->send_unauthorised();
        }else{
            //decode JWT
            $key = SECRET_KEY;
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $uid = $decoded->user_id;

            //decide what to do
            if(!is_null($exists)) $this->get_gateway()->find_exists($uid, $exists);
            else if(!is_null($add)) $this->get_gateway()->add($uid, $add);
            else if(!is_null($remove )) $this->get_gateway()->remove($uid, $remove);
            else $this->get_gateway()->find_all($uid);

            return $this->get_gateway()->get_result();
        }
    }
}