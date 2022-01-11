<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\PapersGateway;
/**
 * Papers Controller
 * Accepts: GET
 * Params: authorid, award, id
 * @author: Scott Donaldson 19019810
 */
class PapersController extends Controller{
    protected function set_gateway(){
      $this->gateway = new PapersGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "GET") {
            $this->send_method_not_allowed();
        }
        $arr = $this->parameters_to_array();
        // find out which gateway operation to execute based on parsing the parameters.
        switch($this->parse_parameters($arr)){
            default:
            case 'get_all':
                $this->get_gateway()->find_all();
                break;
            case 'get_by_author_id':
                $this->get_gateway()->find_by_author($arr['author_id']);
                break;
            case 'get_all_with_award':
                $this->get_gateway()->find_by_award($arr['award']);
                break;
            case 'get_by_paper_id':
                $this->get_gateway()->find_one($arr['id']);
                break;
            case 'get_random':
                $this->get_gateway()->get_random();
                break;
            case 'find_award':
                $this->get_gateway()->find_by_award($arr['award']);
        }
        return $this->get_gateway()->get_result();
    }

    private function parse_parameters($arr = []) {
        // turn array into variables
        $id = $arr["id"];
        $award = $arr["award"];
        $author_id = $arr["author_id"];
        $get_random = $arr["get_random"];

        // make sure ID is set
        if(!is_null($id) && !$this->get_gateway()->does_id_exist($id)){
            $this->send_bad_request();
        }
        
        // check what is set and what isnt set to decide what operation to run
        if(!is_null($award) && $award !== "all") return 'find_award';
        if(!is_null($get_random)) return 'get_random';
        if(is_null($id) && is_null($award) && is_null($author_id)) return 'get_all';
        if(is_null($id) && is_null($award)) return 'get_by_author_id';
        if(is_null($id) && is_null($author_id)) return 'get_all_with_award';
        if(is_null($award) && is_null($author_id)) return 'get_by_paper_id'; 
    }

    private function parameters_to_array(){
        //Turn parameters into array
        $array['id'] = $this->get_request()->get_parameter("id");
        $array['award'] = $this->get_request()->get_parameter("award");
        $array['author_id'] = $this->get_request()->get_parameter("authorid");
        $array['get_random'] = $this->get_request()->get_parameter("getrandom");
        return $array;
    }
}