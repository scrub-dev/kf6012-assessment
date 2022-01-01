<?php

namespace Src\Controllers;

abstract class Controller{
    
    private $request;
    private $response;
    protected $gateway;

    public function __construct($request,$response){
        $this->set_gateway();
        $this->set_request($request);
        $this->set_response($response);

        $data = $this->process_request($request);
        $this->get_response()->set_data($data);
    }

    private function set_request($req){
        $this->request = $req;
    }
    protected function get_request(){
        return $this->request;
    }
    private function set_response($res){
        $this->response = $res;
    }
    protected function get_response(){
        return $this->response;
    }
    protected function set_gateway(){

    }
    protected function get_gateway(){
        return $this->gateway;
    }
    protected function process_request(){

    }
}