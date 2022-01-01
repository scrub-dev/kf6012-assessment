<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\PapersGateway;

class PapersController extends Controller{
    protected function set_gateway(){
      $this->gateway = new PapersGateway();
    }
    protected function process_request(){

    }
}