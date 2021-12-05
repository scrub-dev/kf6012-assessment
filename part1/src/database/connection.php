<?php
namespace Src\Database;

use PDO;

/**
 * @author Scott Donaldson 19019810
 */
class Connection {
    private $connection;

    public function __construct($db_name){
        $this->set_connection($db_name);
    }
    private function set_connection($db_name){
        $this->connection = new PDO('sqlite:' . $db_name);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function get_connection(){
        return $this->connection;
    }
}