<?php
namespace Src\RequestHandlers;

/**
 * ApiRequestHandler gives routes for different API Endpoint requests
 * @author Scott Donaldson 19019810
 */
abstract class ApiRequestHandler extends RequestHandler {
    protected function parse($request){
        switch($request->get_api_path()){
            
        }
    }
}