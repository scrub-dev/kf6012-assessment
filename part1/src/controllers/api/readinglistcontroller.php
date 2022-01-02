<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Firebase\JWT\JWT;
use Src\Firebase\JWT\Key;
use Src\Gateways\ReadinglistGateway;

class ReadinglistController extends Controller{
    protected function set_gateway(){
        $this->gateway = new ReadinglistGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "POST"){
            $this->send_method_not_allowed();
        }

        $token = $this->get_request()->get_parameter('token');
        $add = $this->get_request()->get_parameter('add');
        $remove = $this->get_request()->get_parameter('remove');

        if(is_null($token)){
            $this->send_unauthorised();
        }

        $key = SECRET_KEY;
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $uid = $decoded->user_id;

        if(!is_null($add)) $this->get_gateway()->add($uid, $add);
        else if(!is_null($remove )) $this->get_gateway()->remove($uid, $remove);
        else $this->get_gateway()->find_all($uid);

        return $this->get_gateway()->get_result();
    }
}