<?php
namespace Src\Gateways;

use Src\Gateways\Gateway as Gateway;
/**
 * Authentication Gateway
 * @author: Scott Donaldson 19019810
 */
class AuthenticationGateway extends Gateway{
    public function __construct(){
        $this->set_database(USER_DATABASE);
    }

    public function find_password($email){
      $sql = "SELECT id, password FROM user WHERE email = :email";
      $params = [":email" => $email];
      $res = $this->get_database()->execute_sql($sql, $params);
      $this->set_result($res);
    }
}