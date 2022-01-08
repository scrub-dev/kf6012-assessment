<?php
namespace Src\Gateways;

use Src\Gateways\Gateway as Gateway;
/**
 * Authors Gateway
 * @author: Scott Donaldson 19019810
 */
class AuthorsGateway extends Gateway{
    private $sql = "SELECT author_id, first_name, middle_name, last_name FROM author ";
    public function __construct(){
        $this->set_database(DATABASE);
    }

    public function find_all(){
        $this->sql .= " ORDER BY first_name || middle_name || last_name ASC";
        $res = $this->get_database()->execute_sql($this->sql);
        $this->set_result($res);
    }

    public function find_one($id){
        $this->sql .= "WHERE author_id = :x";
        $params = [":x" => $id];
        $res = $this->get_database()->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_largest_id(){
      $sql = "SELECT author_id FROM author WHERE author_id = (SELECT MAX(author_id) FROM author)";
      $res = $this->get_database()->execute_sql($sql);
      return $res[0]['author_id'];
    }
    
    public function find_smallest_id(){
      $sql = "SELECT author_id FROM author WHERE author_id = (SELECT MIN(author_id) FROM author)";
      $res = $this->get_database()->execute_sql($sql);
      return $res[0]['author_id'];
    }

    public function does_id_exist($id){
      if($id > $this->find_largest_id() || $id < $this->find_smallest_id()) return false;
      else{
        $sql = "SELECT EXISTS(SELECT author_id FROM author WHERE author_id = :id LIMIT 1)";
        $params = [":id" => $id];
        $res = $this->get_database()->execute_sql($sql, $params);
        return boolval($res[0]);
      }
    }

    public function find_by_offset($limit, $offset){
        $this->sql .= "ORDER BY first_name LIMIT :a OFFSET :b";
        $params = [":a" => $limit, ":b" => $offset];
        $res = $this->get_database()->execute_sql($this->sql, $params);
        $this->set_result($res);
    }
}