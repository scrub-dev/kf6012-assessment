<?php
namespace Config\Handlers;
/**
 * Class for handling exceptions where HTML expected
 * @author Scott Donaldson 19019810
 */
abstract class HTMLExceptionHandler extends Handler {
    public function handle($e){
        $output = "<h1>Internal Server Error!</h1><br><h2>Status Code: 500</h2>";
        
        if(DEV_MODE){
            $output .= "<br><p>Message: " . $e->getMessage();
            $output .= "<br>File: " . $e->getFile();
            $output .= "<br>Line: " . $e->getLine();
            $output .= "<br>Stacktrace: " . $e->getTraceAsString();
        }

        echo $output;
    }
}