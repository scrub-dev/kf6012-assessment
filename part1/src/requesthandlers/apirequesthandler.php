<?php
namespace Src\RequestHandlers;

use Src\Controllers\Api;
use Src\Responses;

/**
 * ApiRequestHandler gives routes for different API Endpoint requests
 * @author Scott Donaldson 19019810
 */
class ApiRequestHandler extends RequestHandler {
    protected function parse($request){
        switch($request->get_api_path()){
            default:
            case "":
                $controller = new Api\DefaultController($request, $this->response);
                break;
            case "authors":
                $controller = new Api\AuthorsController($request, $this->response);
                break;
            case "papers":
                $controller = new Api\PapersController($request, $this->response);
                break;
            case "authenticate":
                break;
        }
    }
}