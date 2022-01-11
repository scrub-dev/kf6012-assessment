<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\AuthorsGateway;
/**
 * Authors Controller
 * Accepts: GET
 * Params: id
 * @author: Scott Donaldson 19019810
 */
class AuthorsController extends Controller{
    protected function set_gateway(){
        $this->gateway = new AuthorsGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "GET") {
            $this->send_method_not_allowed();
        }

        $id = $this->get_request()->get_parameter("id");

        //Check if ID exist
        if(is_null($id)) $this->get_gateway()->find_all();
        else if($this->get_gateway()->does_id_exist($id)){
            //get one author
            $this->get_gateway()->find_one($id);
        }else{
            //get all authors
            $this->send_bad_request();
        }
        
        return $this->get_gateway()->get_result();
    }
}