<?php
namespace Src\Database;

use PDO;

/**
 * Connection
 * Handles a connection to an SQLite Database
 * @author: Scott Donaldson 19019810
 */
class Connection {
    private $connection;

    public function __construct($db_name){
        $this->set_connection($db_name);
    }
    // set the connection
    private function set_connection($db_name){
        $this->connection = new PDO('sqlite:' . $db_name);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    // return the connection
    public function get_connection(){
        return $this->connection;
    }
}