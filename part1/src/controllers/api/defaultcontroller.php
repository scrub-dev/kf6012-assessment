<?php
namespace Src\Controllers\Api;

use Src\Controllers\Controller;

class DefaultController extends Controller{
    protected function process_request(){
        $data['author']['name'] = "Scott Donaldson";
        $data['author']['id'] = "w19019810";
        $data['message'] = "This is a basic web api";
        $data['documentation'] = $_SERVER['HTTP_HOST'] . BASEPATH ."documentation";
        return [$data];
    }
}