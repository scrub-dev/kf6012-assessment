<?php
namespace Src\RequestHandlers;

use Src\Responses;

/**
 * Abstract class for different types of Requests
 * Performs basic Request functions for all types of requests
 * @author Scott Donaldson 19019810
 */
abstract class RequestHandler {

    protected $request;
    protected $response;

    public function __construct($request){
        $this->request = $request;
        $this->response = ($this->request->is_api()) ? new Responses\JsonResponse() : new Responses\HtmlResponse();
        $this->parse($this->request);
    }
    public function process(){
        return $this->response->get_data();
    }
    protected function parse($request){

    }
    public function get_response(){
        return $this->response;
    }
    public function set_response($res){
        $this->response = $res;
    }
}