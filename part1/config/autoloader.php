<?php
/**
 * Autoloader adapted to use namespaces
 */
function autoloader($classname){
    $fn = strtolower($classname) . ".php";
    $fn = str_replace('\\', DIRECTORY_SEPARATOR, $fn);

    if(is_readable($fn)){
        require($fn);
    }else throw new Exception("File Not Found: " . $fn);
}