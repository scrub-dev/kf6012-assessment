<?php
namespace Src\Responses;

/**
 * @author Scott Donaldson 19019810
 */
abstract class JsonResponse extends Response{

    private $message;
    private $status_code;

    protected function headers(){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }
    public function set_message($msg){
        $this->message = $msg;
    }
    public function set_status_code($code){
        $this->status_code = $code;
    }
    public function get_data(){
        if(is_null($this->message)){
            if(count($this->data) == 0){
                $this->message = "No Contnt";
                $this->status_code = 204;
            }else{
                $this->message = "Ok";
                $this->status_code = 200;
            }
        }

        if($this->status_code == 200){
            $res = Array(
                "message" => $this->message,
                "status" => $this->statusCode,
                "count" => count($this->data),
                "timestamp" => date("Y-m-d-H:i:s"),
                "results" => $this->data
            );
        }else{
            $res = Array(
                "status" => $this->statusCode,
                "message" => $this->message,
                "timestamp" => date("Y-m-d-H:i:s"),
                "path" => strtok($_SERVER['REQUEST_URI'], '?')
            );
        }
        return json_encode($res);
    }
}