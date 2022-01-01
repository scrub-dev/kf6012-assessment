<?php

namespace Src\Controllers\HTML;

use Src\Controllers\Controller;
use Src\Webpages\DocumentationPage;

class DocumentationController extends Controller{
    public function process_request(){
        $data = new DocumentationPage("Documentation Page");
        return $data->generate_webpage();
    }
}