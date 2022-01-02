<?php

namespace Src\Controllers\HTML;

use Src\Controllers\Controller;
use Src\Webpages\DocumentationPage;
/**
 * Documentation Controller
 * Accepts: GET/POST
 * Params: email, password
 * @author: Scott Donaldson 19019810
 */
class DocumentationController extends Controller{
    public function process_request(){
        $data = new DocumentationPage("Documentation Page");
        return $data->generate_webpage();
    }
}