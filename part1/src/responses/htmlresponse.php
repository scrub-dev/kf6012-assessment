<?php
namespace Src\Responses;

/**
 * @author Scott Donaldson 19019810
 */
class HtmlResponse extends Response{
    protected function headers(){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: text/html; charset=UTF-8");
    }
}