<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\AuthorsGateway;

class AuthorsController extends Controller{
    protected function set_gateway(){
        $this->gateway = new AuthorsGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "GET") {
            $this->send_method_not_allowed();
        }

        $id = $this->get_request()->get_parameter("id");

        if(is_null($id)) $this->get_gateway()->find_all();
        else if($this->get_gateway()->does_id_exist($id)){
            $this->get_gateway()->find_one($id);
        }else{
            $this->send_bad_request();
        }
        
        return $this->get_gateway()->get_result();
    }
}