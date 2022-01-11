<?php
namespace Src\Gateways;

use Src\Gateways\Gateway as Gateway;
/**
 * Authentication Gateway
 * @author: Scott Donaldson 19019810
 */
class ReadinglistGateway extends Gateway{
    public function __construct(){
        $this->set_database(USER_DATABASE);
    }
    public function find_all($uid){
        $sql = "SELECT paper_id FROM list WHERE user_id = :uid";
        $params = [":uid" => $uid];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
    public function add($uid, $add){
        $sql = "INSERT INTO list (user_id, paper_id) VALUES (:uid, :paper)";
        $params = [":uid" => $uid, ":paper" => $add];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
    public function remove($uid, $rem){
        $sql = "DELETE FROM list WHERE (user_id = :uid) AND (paper_id = :paper)";
        $params = [":uid" => $uid, ":paper" => $rem];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
    public function find_exists($uid, $exists){
        $sql = "SELECT EXISTS (SELECT user_id FROM list WHERE user_id = :a AND paper_id = :b LIMIT 1) as res";
        $params = [":a" => $uid, ":b" => $exists];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
}