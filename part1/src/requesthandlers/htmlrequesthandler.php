<?php
namespace Src\RequestHandlers;

use Src\Webpages;
use Src\Responses;

/**
 * HTMl Request Handler for endpoints where a HTML Reponse is excpected
 * @author Scott Donaldson 19019810
 */
abstract class HtmlRequestHandler extends RequestHandler {
    protected function parse($request){
        $response = new Responses\HtmlResponse();
        switch($request->get_path()){
            default:
            case "home":
                $controller = new Controllers\Html\HomeController($request, $response);
                break;
            case "documentation":
                $contoller = new Controllers\Html\DocumentationController($request, $response);
                break;
            case "error":
                $controller = new Controllers\Html\ErrorController($request,$response);
        }
    }
}