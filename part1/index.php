<?php
include 'config/config.php';

use Src\Requests;
use Src\RequestHandlers;
$req = new Requests\Request();

//check is request is API, set the Exception Handler to HTML if it is not
if(!$req->is_api()) set_exception_handler([new \Config\Handlers\HTMLExceptionHandler(), 'handle']);

// Create different request handler based on if it is API or not
$req_handler = ($req->is_api()) ? new RequestHandlers\ApiRequestHandler($req) : new RequestHandlers\HtmlRequestHandler($req);
echo $req_handler->process();