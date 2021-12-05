<?php
namespace Src\Requests;
/**
 * @author Scott Donaldson 19019810
 * Handles incoming requests to apache server, give functions for identifying what type of request it is (API or Normal) as well as the paramaters passed
 */
class Request{

    private $basepath = BASEPATH;
    private $path;
    private $request_method;

    public function __construct(){
        $this->path = parse_url($this->get_uri())['path'];
        $this->path = strtolower(str_replace($this->basepath, "", $this->path));
        $this->path = trim($this->path, "/");

        $this->set_request_method();
    }

    public function get_uri(){
        return $_SERVER['REQUEST_URI'];
    }
    public function get_path(){
        return $this->path;
    }
    public function get_api_path(){
        return trim(preg_replace("/^api/", "", $this->get_path()), "");
    }
    public function is_api(){
        return preg_match("/api.*/", $this->path);
    }
    private function set_request_method(){
        $this->request_method = $_SERVER['REQUEST_METHOD'];
    }
    public function get_request_method(){
        return $this->request_method;
    }
    public function get_parameter($param){
        return filter_input(($this->get_request_method == "GET") ? INPUT_GET : INPUT_POST, $param, FILTER_SANITIZE_SPECIAL_CHARS);
    }
}