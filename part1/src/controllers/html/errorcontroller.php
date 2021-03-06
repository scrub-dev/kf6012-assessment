<?php

namespace Src\Controllers\HTML;

use Src\Controllers\Controller;
use Src\Webpages\ErrorPage;
/**
 * Error Controller
 * Accepts: GET/POST
 * Params: code, message
 * @author: Scott Donaldson 19019810
 */
class ErrorController extends Controller{
    public function process_request(){
        //get parameters to display custom error messages
        $x['code'] = $this->get_request()->get_parameter('code');
        $x['message'] = $this->get_request()->get_parameter('message');

        // generate error message page
        $data = new ErrorPage("Error", $x);
        return $data->generate_webpage();
    }
}