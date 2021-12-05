<?php
namespace Config\Handlers;
/**
 * Class for handling errors
 * @author Scott Donaldson 19019810
 */
abstract class ErrorHandler {
    public function handle($errno, $errstr, $errfile, $errline){
        if (($errno != 2 && $errno != 8) || DEV_MODE) {
            throw new \Exception("Error Detected: [$errno] $errstr file: $errfile line: $errline", 1);
        }
    }
}