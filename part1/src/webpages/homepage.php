<?php
namespace Src\Webpages;

/**
 * @author Scott Donaldson 19019810
 */
class HomePage extends Webpage {
  public function __construct($title){
    $this->set_head($title);
    $this->set_foot();


    $this->add_heading1("Home", "header");

    $x = <<< EOT
    Name: Scott Donaldson<br>
    ID: 19019810
EOT;
    $y = <<< EOT
    This website is part of university coursework and not associated with or endorsed
    by the DIS Conference
EOT;
    $this->add_paragraph($x, "main");
    $this->add_paragraph($y, "main");
    $this->add_link("Documentation", BASEPATH ."documentation", "link");
  }
}