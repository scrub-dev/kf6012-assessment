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
        $materialize_stylesheet = BASEPATH . "assets/css/materialize.min.css";
        $stylesheet = BASEPATH . "assets/css/style.css";
        $this->head = <<<EOT
<!DOCTYPE html>
<html lang="en-gb">
<head>
        <title>$title</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href=$stylesheet>
        <link rel="stylesheet" href=$materialize_stylesheet>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<body>
EOT;
    }
    protected function set_foot(){
        $javascript = BASEPATH . "assets/js/materialize.min.js";
        $this->foot = <<<EOT
        </div>
        <footer>
            <div class='container'></div>
        </footer>
    <script type="text/javascript" src="$javascript"></script>        
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
    protected function get_body(){
        return $this->body;
    }
    protected function add_heading1($x, $style){
        $this->append_body("<h1 class=$style>$x</h1>");
    }
    protected function add_heading2($x, $style){
        $this->append_body("<h2 class=$style>$x</h2>");
    }
    protected function add_heading3($x, $style){
        $this->append_body("<h3 class=$style>$x</h3>");
    }
    protected function add_heading($header_level, $text, $style){
        $this->append_body("<h$header_level class='$style'>$text</h$header_level>");
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
    protected function add_navbar($arr = []){
        $navbar_links = "";
        foreach($arr as $text => $link){
            $navbar_links .= "<li><a href='$link'>$text</a></li>";
        }
        $navbar = <<< EOT
        <nav>
            <div class="nav-wrapper main-bg">
                <div class='left brand-logo'>
                    <a href="#" class='accent-underline slight-margin'>KF6012 Assessment</a>
                </div>
                <ul id="nav-mobile" class="right">
EOT;
        $navbar .= $navbar_links;
        $navbar .= <<< EOT
            </ul>
        </div>
    </nav>
    <div class='container'>
EOT;
        $this->append_body($navbar);
    }
    public function generate_webpage(){
        return $this->get_head() . $this->get_body() . $this->get_foot();
    }
}