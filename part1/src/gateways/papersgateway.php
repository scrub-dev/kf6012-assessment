<?php
namespace Src\Gateways;

use Src\Database\Database;
use Src\Gateways\Gateway as Gateway;

class PapersGateway extends Gateway{
    private $sql = "SELECT paper.paper_id, paper.title, paper.abstract, paper.doi, author.author_id, award.award_type_id, award_type.name as award_name FROM paper 
    JOIN paper_author ON (paper_author.paper_id = paper.paper_id)
    JOIN author ON (author.author_id = paper_author.author_id)
    LEFT JOIN award ON (award.paper_id = paper.paper_id)
    LEFT JOIN award_type ON (award_type.award_type_id = award.award_type_id) ";

    private $database;
    public function __construct(){
        $this->database = new Database(DATABASE);
    }

    public function find_all(){
        $res = $this->database->execute_sql($this->sql);
        $this->set_result($res);
    }

    public function find_one($id){
        $this->sql .= "WHERE paper.paper_id = :id";
        $params = [":id" => $id];
        $res = $this->database->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_largest_id(){
        $sql = "SELECT paper_id FROM paper WHERE paper_id = (SELECT MAX(paper_id) FROM paper)";
        $res = $this->database->execute_sql($sql);
        return $res[0]['paper_id'];
    }
    
    public function find_smallest_id(){
        $sql = "SELECT paper_id FROM paper WHERE paper_id = (SELECT MIN(paper_id) FROM paper)";
        $res = $this->database->execute_sql($sql);
        return $res[0]['paper_id'];
    }

    public function does_id_exist($id){
        if($id > $this->find_largest_id() || $id < $this->find_smallest_id()) return false;
        else{
            $sql = "SELECT EXISTS(SELECT paper_id FROM paper WHERE paper_id = :id LIMIT 1)";
            $params = [":id" => $id];
            $res = $this->database->execute_sql($sql, $params);
            return boolval($res[0]);
        }
    }

    public function find_by_offset($limit, $offset){
        $this->sql .= "ORDER BY first_name LIMIT :a OFFSET :b";
        $params = [":a" => $limit, ":b" => $offset];
        $res = $this->database->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_by_author($id){
        $this->sql .= "WHERE author.authod_id = :id";
        $params = [":id" => $id];
        $res = $this->database->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_by_award($award){
        if($award !== "all"){
            $this->sql .= "WHERE award.award_type_id = :id";
            $params = [":id" => $award];
            $res = $this->database->execute_sql($this->sql, $params);
            $this->set_result($res);
        }else{
            $this->sql .= "WHERE award.award_type_id IS NOT NULL";
            $res = $this->database->execute_sql($this->sql);
            $this->set_result($res);
        }
    }
}