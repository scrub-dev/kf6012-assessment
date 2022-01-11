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

    public function create_account($email, $pword){
        $sql = "INSERT INTO user (email, password) VALUES (:email, :pass)";
        $params = [":email" => $email,
                   ":pass" => $pword];
        $this->get_database()->execute_sql($sql, $params);
    }

    public function does_email_exist($email){
        $sql = "SELECT EXISTS (SELECT email FROM user WHERE email = :x LIMIT 1) as res";
        $params = [":x" => $email];
        $res = $this->get_database()->execute_sql($sql, $params);
        return ($res[0]['res'] == 1);
    }
}