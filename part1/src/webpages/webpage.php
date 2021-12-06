<?php
namespace Src\Webpages;

/**
 * @author Scott Donaldson 19019810
 */
abstract class Webpage {
    private $head;
    private $body;
    private $foot;

    public function __construct($title){
        $this->set_head($title);
        $this->set_foot();
    }
    protected function set_head($title){
        $stylesheet = BASEPATH . "assets/style.css";
        $this->head = <<<EOT
<!DOCTYPE html>
<html lang="en-gb">
<head>
        <title>$title</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href=$stylesheet>
</head>
<body>
EOT;
    }
    protected function set_foot(){
        $this->foot = <<<EOT
</body>
</html>
EOT;
    }
    private function get_head(){
        return $this->head;
    }
    private function get_foot(){
        return $this->foot;
    }
    protected function set_body($x){
        $this->body = $x;
    }
    protected function append_body($x){
        $this->body .= $x;
    }
    protected function add_heading1($x, $style){
        $this->append_body("<h1 class=$style>$x</h1>");
    }
    protected function add_paragraph($x, $style){
        $this->append_body("<p class=$style>$x</p>");
    }
    protected function add_link($x, $link, $style){
        $this->append_body("<a href=$link class=$style>$x</a>");
    }
    protected function div_wrap($x, $style){
        $this->append_body("<div class=$style>$x</div>");
    }
    protected function add_table($heading_array=[],$array=[]){
        $temp = "<table><tr>";
        foreach($heading_array as $key => $value){
            $temp .= "<th class=$value>$key</th>";
        }
        $temp .= "</tr>";
        foreach($array as $row => $rowdata){
            $temp .= "<tr>";
            foreach($rowdata as $rowdata => $value){
                $temp .= "<td>$value</td>";
            }
            $temp .= "</tr>";
        }
        $temp .= "</table>";

        $this->append_body($temp);
    }
    public function generate_webpage(){
        return $this->head . $this->body . $this->foot;
    }
}