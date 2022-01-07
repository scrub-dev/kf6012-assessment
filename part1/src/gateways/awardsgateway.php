<?php
namespace Src\Gateways;

use Src\Gateways\Gateway as Gateway;
/**
 * Awards Gateway
 * @author: Scott Donaldson 19019810
 */
class AwardsGateway extends Gateway{
    private $sql = "SELECT award_type_id, name FROM award_type";
    public function __construct(){
        $this->set_database(DATABASE);
    }

    public function find_all(){
        $res = $this->get_database()->execute_sql($this->sql);
        $this->set_result($res);
    }
}