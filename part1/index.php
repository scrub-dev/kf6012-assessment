<?php
include 'config/config.php';

use Src\Requests;
use Src\RequestHandlers;
$req = new Requests\Request();

if(!$req->is_api()) set_exception_handler([new \Config\Handlers\HTMLExceptionHandler(), 'handler']);

$req_handler = ($req->is_api()) ? new RequestHandlers\ApiRequestHandler($req) : new RequestHandlers\HtmlRequestHandler($req);
echo $req_handler->process();