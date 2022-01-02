<?php
namespace Src\Gateways;

use Src\Database\Database;
use Src\Gateways\Gateway as Gateway;

class ReadinglistGateway extends Gateway{
    public function __construct(){
        $this->set_database(USER_DATABASE);
    }
    public function findAll($uid){
        $sql = "SELECT DISTINCT film_id FROM list WHERE user_id = :uid";
        $params = [":uid" => $uid];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
    public function add($uid, $add){
        $sql = "INSERT INTO list (user_id, film_id) VALUES (:uid, :film)";
        $params = [":uid" => $uid, ":film" => $add];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
    public function remove($uid, $rem){
        $sql = "DELETE FROM list WHERE (user_id = :uid) AND (film_id = :film)";
        $params = [":uid" => $uid, ":film" => $rem];
        $this->set_result($this->get_database()->execute_sql($sql, $params));
    }
}