<?php

namespace Src\Controllers\HTML;

use Src\Controllers\Controller;
use Src\Webpages\HomePage;
/**
 * Homepage Controller
 * Accepts: GET/POST
 * Params: n/a
 * @author: Scott Donaldson 19019810
 */
class HomepageController extends Controller{
    public function process_request(){
        // generate homepage
        $data = new HomePage("Home");
        return $data->generate_webpage();
    }
}