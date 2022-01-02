<?php
namespace Src\Database;
use PDO;
/**
 * Database
 * Creates Connection to database
 * @author: Scott Donaldson 19019810
 */
class Database {

    public $connection;

    public function __construct($db_name){
        $this->connection = new Connection($db_name);
        $this->connection = $this->connection->get_connection();
    }
    public function execute_sql($sql, $params=[]){
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}