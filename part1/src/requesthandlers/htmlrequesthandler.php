<?php
namespace Src\RequestHandlers;

use Src\Responses;
use Src\Controllers\HTML;

/**
 * HTMl Request Handler for endpoints where a HTML Reponse is excpected
 * @author Scott Donaldson 19019810
 */
class HtmlRequestHandler extends RequestHandler {
    protected function parse($request){
        switch($request->get_path()){
            default:
                header('Location: ' . BASEPATH . "error?code=404&message=Page%20not%20found");
            case "":
            case "home":
                $controller = new HTML\HomepageController($request, $this->response);
                break;
            case "documentation":
                $contoller = new HTML\DocumentationController($request, $this->response);
                break;
            case "error":
                $controller = new HTML\ErrorController($request,$this->response);
        }
    }
}