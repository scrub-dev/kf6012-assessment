<?php
namespace Src\Gateways;

use Src\Database\Database;
use Src\Gateways\Gateway as Gateway;

class AuthenticationGateway extends Gateway{
    public function __construct(){
        $this->database = new Database(USER_DATABASE);
    }

    public function find_password($email){
      $sql = "SELECT id, password FROM user WHERE email = :email";
      $params = [":email" => $email];
      $res = $this->get_database()->execute_sql($sql);
      $this->set_result($res);
    }
}