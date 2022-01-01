<?php

namespace Src\Controllers\HTML;

use Src\Controllers\Controller;
use Src\Webpages\HomePage;

class HomepageController extends Controller{
    public function process_request(){
        $data = new HomePage("Home");
        return $data->generate_webpage();
    }
}