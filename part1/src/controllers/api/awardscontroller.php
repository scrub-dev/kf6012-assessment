<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\AwardsGateway;

/**
 * Awards Controller
 * Accepts: GET
 * Params: N/A
 * @author: Scott Donaldson 19019810
 */
class AwardsController extends Controller{
    protected function set_gateway(){
        $this->gateway = new AwardsGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "GET") {
            $this->send_method_not_allowed();
        }
        $this->get_gateway()->find_all();

        return $this->get_gateway()->get_result();
    }
}