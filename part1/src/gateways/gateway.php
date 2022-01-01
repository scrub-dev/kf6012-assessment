<?php
namespace Src\Gateways;
use Src\Database\Database;

abstract class Gateway {
    private $database;
    private $result;

    protected function set_database($databaseName){
        $this->database = new Database($databaseName);
    }
    protected function get_database(){
        return $this->database;
    }
    protected function set_result($result){
        $this->result = $result;
    }
    public function get_result(){
        return $this->result;
    }
    public function get_next($limit, $offset){
        $next_offset = (int)$offset + (int)$limit;
        $params = "?limit=$limit&offset=$next_offset" ;
        return $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?') . $params;
    }
}