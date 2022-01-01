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
            $this->get_response()->set_message("Method Not Allowed");
            $this->get_response()->set_status_code(405);
            return $this->get_response();
        }

        $id = $this->get_request()->get_parameter("id");

        if(is_null($id)) $this->get_gateway()->find_all();
        else if($this->get_gateway()->does_id_exist($id)){
            $this->get_gateway()->find_one($id);
        }else{
            $this->get_response()->set_message("Bad Request");
            $this->get_response()->set_status_code(400);
            return $this->get_response();
        }
        
        return $this->get_gateway()->get_result();
    }
}