<?php
namespace Src\Webpages;

/**
 * @author Scott Donaldson 19019810
 */
class ErrorPage extends Webpage {
    public function __construct($title, $error_arr = []){
      $this->set_head($title);
      $this->append_body($this->generate_error_page($error_arr));
      $this->set_foot();
    }
    private function generate_error_page($array = []){
      $this->add_heading1("Oops ".$array['code'], "title");
      $this->add_paragraph($array['message'], "main");
      $this->add_link("Go Home", BASEPATH . "home", "link");
    }
}