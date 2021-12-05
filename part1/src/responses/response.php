<?php
namespace Src\Responses;

/**
 * @author Scott Donaldson 19019810
 */
abstract class Response{

    protected $data;

    public function __construct(){
        $this->headers();
    }
    protected function headers(){

    }
    public function set_data($data){
        $this->data = $data;
    }
    public function get_data(){
        return $this->data;
    }
}