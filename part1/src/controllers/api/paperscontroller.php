<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;
use Src\Gateways\PapersGateway;

class PapersController extends Controller{
    protected function set_gateway(){
      $this->gateway = new PapersGateway();
    }
    protected function process_request(){
        if($this->get_request()->get_request_method() !== "GET") {
            $this->send_method_not_allowed();
        }
        $arr = $this->parameters_to_array();
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
                $this->get_gateway()->find_by_id($arr['id']);
                break;
        }
        return $this->get_gateway()->get_result();
    }

    private function parse_parameters($arr = []) {
        $id = $arr["id"];
        $award = $arr["award"];
        $author_id = $arr["author_id"];

        if(!is_null($id) && !$this->get_gateway()->does_id_exist()){
            $this->send_bad_request();
        }

        if(!is_null($award) && $award !== "all"){
            $this->send_bad_request();
        }

        if(is_null($id) && is_null($award) && is_null($author_id)) return 'get_all';
        if(is_null($id) && is_null($award)) return 'get_by_author_id';
        if(is_null($id) && is_null($author_id)) return 'get_all_with_award';
        if(is_null($award) && is_null($author_id)) return 'get_by_paper_id'; 
    }

    private function parameters_to_array(){
        $array['id'] = $this->get_request()->get_parameter("id");
        $array['award'] = $this->get_request()->get_parameter("award");
        $array['author_id'] = $this->get_request()->get_parameter("authorid");
        return $array;
    }
}