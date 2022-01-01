<?php
namespace Config\Handlers;
use Config\Handlers\Handler;
/**
 * Handler for Exceptions when output is JSON
 * @author Scott Donaldson 19019810
 */
class JSONExceptionHandler extends Handler {
    public function handle($e){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        
        $output['error'] = "Internal Server Error";
        $output['status'] = 500;

        if(DEV_MODE){
            $output['message'] = $e->getMessage();
            $output['file'] = $e->getFile();
            $output['line'] = $e->getLine();
            $output['stacktrace'] = $e->getTraceAsString();
        }

        echo json_encode($output);
    }
}