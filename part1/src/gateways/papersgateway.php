<?php
namespace Src\Gateways;

use Src\Database\Database;
use Src\Gateways\Gateway as Gateway;

class PapersGateway extends Gateway{
    private $sql = "";
    private $database;
    public function __construct(){
        $this->database = new Database(DATABASE);
    }

    public function find_all(){

    }

    public function find_one($id){

    }

    public function find_largest_id(){

    }
    
    public function find_smallest_id(){

    }

    public function does_id_exist($id){

    }

    public function find_by_offset($limit, $offset){
        $this->sql .= "ORDER BY first_name LIMIT :a OFFSET :b";
        $params = [":a" => $limit, ":b" => $offset];
        $res = $this->database->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_by_author($id){

    }

    public function find_by_award($award){
      
    }


}