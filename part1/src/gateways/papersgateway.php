<?php
namespace Src\Gateways;

use Src\Gateways\Gateway as Gateway;
/**
 * Papers Gateway
 * @author: Scott Donaldson 19019810
 */
class PapersGateway extends Gateway{
    private $sql = "SELECT paper.paper_id, paper.title, paper.abstract, paper.doi
    FROM paper ";

    public function __construct(){
        $this->set_database(DATABASE);
    }

    public function get_all(){
        $this->sql .= " ORDER BY paper.title ASC";
        $res = $this->get_database()->execute_sql($this->sql);
        $this->set_result($res);
    }

    public function find_all(){
        $this->get_all();
        $arr = [];
        foreach($this->get_result() as $paper){
            $paper['authors'] = $this->get_authors($paper['paper_id']);
            $paper["awards"] = $this->get_awards($paper["paper_id"]);
            array_push($arr, $paper);
        }
        $this->set_result($arr);
    }

    public function find_one($id){
        $this->sql .= "WHERE paper.paper_id = :id";
        $params = [":id" => $id];
        $res = $this->get_database()->execute_sql($this->sql, $params);
        $this->set_result($this->parse_paper($res));
    }

    public function parse_paper($res){
        $res[0]["authors"] = $this->get_authors($res[0]["paper_id"]);
        $res[0]["awards"] = $this->get_awards($res[0]["paper_id"]);
        return $res;
    }

    public function get_authors($paper_id){
        $sql = "SELECT paper_author.author_id, author.first_name, author.middle_name, author.last_name FROM paper_author JOIN author ON (author.author_id = paper_author.author_id) WHERE paper_author.paper_id = :id";
        $params = [":id" => $paper_id];
        $res = $this->get_database()->execute_sql($sql, $params);
        $output = [];
        for($i = 0; $i < count($res); $i++){
            $name = $res[$i]["first_name"] . " " . (($res[$i]["middle_name"] !== "")? $res[$i]["middle_name"] . " " : "") . $res[$i]["last_name"];
            array_push($output, Array("author_id" => $res[$i]["author_id"], "author_name" => $name));
        }
        return $output;
    }

    public function get_awards($paper_id){
        $sql = "SELECT award_type.name, award.award_type_id FROM award JOIN award_type ON (award_type.award_type_id = award.award_type_id) WHERE award.paper_id = :id";
        $params = [":id" => $paper_id];
        $res = $this->get_database()->execute_sql($sql, $params);
        $output = [];
        for($i = 0; $i < count($res); $i++){
            array_push($output, Array("award_name" => $res[$i]["name"], "award_id" => $res[$i]["award_type_id"]));
        }
        return $output;
    }
    //60200

    public function find_largest_id(){
        $sql = "SELECT paper_id FROM paper WHERE paper_id = (SELECT MAX(paper_id) FROM paper)";
        $res = $this->get_database()->execute_sql($sql);
        return $res[0]['paper_id'];
    }
    
    public function find_smallest_id(){
        $sql = "SELECT paper_id FROM paper WHERE paper_id = (SELECT MIN(paper_id) FROM paper)";
        $res = $this->get_database()->execute_sql($sql);
        return $res[0]['paper_id'];
    }

    public function does_id_exist($id){
        if($id > $this->find_largest_id() || $id < $this->find_smallest_id()) return false;
        else{
            $sql = "SELECT EXISTS(SELECT paper_id FROM paper WHERE paper_id = :id LIMIT 1)";
            $params = [":id" => $id];
            $res = $this->get_database()->execute_sql($sql, $params);
            return boolval($res[0]);
        }
    }

    public function find_by_offset($limit, $offset){
        $this->sql .= "ORDER BY first_name LIMIT :a OFFSET :b";
        $params = [":a" => $limit, ":b" => $offset];
        $res = $this->get_database()->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_by_author($id){
        $this->sql .= "WHERE author.authod_id = :id";
        $params = [":id" => $id];
        $res = $this->get_database()->execute_sql($this->sql, $params);
        $this->set_result($res);
    }

    public function find_by_award($award){
        if($award !== "all"){
            $this->sql .= "JOIN award ON (award.paper_id = paper.paper_id) WHERE award.award_type_id = :id";
            $params = [":id" => $award];
            $res = $this->get_database()->execute_sql($this->sql, $params);
            $this->set_result($res);
        }else{
            $this->sql .= "JOIN award ON (award.paper_id = paper.paper_id) WHERE award.award_type_id IS NOT NULL";
            $res = $this->get_database()->execute_sql($this->sql);
            $this->set_result($res);
        }
    }

    public function get_random(){
        $random_id = rand($this->find_smallest_id(), $this->find_largest_id());
        $this->find_one($random_id);
    }
}