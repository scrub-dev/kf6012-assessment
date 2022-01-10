<?php
include 'config/autoloader.php';
spl_autoload_register('autoloader');

define('DEV_MODE', true);

define('BASEPATH', (DEV_MODE)? '/part1/' : '/kf6012/part1/');
define('API_BASEPATH', BASEPATH . "api/");
define('DATABASE', 'src/database/databases/dis.sqlite');
define('USER_DATABASE', 'src/database/databases/user.sqlite');
define('SECRET_KEY', "XYZ123");

ini_set('display_errors', DEV_MODE);
ini_set('display_startup_errors', DEV_MODE);

set_exception_handler([new Config\Handlers\JSONExceptionHandler(), 'handle']);
set_error_handler([new Config\Handlers\ErrorHandler(), 'handle']);