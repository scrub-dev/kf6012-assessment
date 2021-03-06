<?php
namespace Src\Webpages;

/**
 * @author Scott Donaldson 19019810
 */
class DocumentationPage extends Webpage {
    public function __construct($title){
        $this->set_head($title);
        $this->set_foot();
        $this->add_navbar(["Home" => BASEPATH ."home", "Documentation" => BASEPATH ."documentation"]);
        $this->add_heading1("Documentation", "accent-underline");
        $this->add_paragraph("Please read below for all the available endpoints of the kf6012 API.", "");
        $this->add_link("Go to Home", BASEPATH ."home", "button-accent");


        $authorendpoint = Array(
          'endpoint_name' => 'Authors',
          'description' => 'Returns Authors based on parameters sent.',
          'full_url' => "http://" . $_SERVER['HTTP_HOST'] . API_BASEPATH . "authors",
          'supported_http_methods' => 'GET',
          'supported_parameters' => "ID : Number",
          'expected_response' => 'Status, Message, Count, Timestamp, Results',
          'expected_status_code' => ['200','204','400'],
          'example_request' => $_SERVER['HTTP_HOST'] . API_BASEPATH . "authors/id=59429",
          'example_response' => '{message: "OK", status: 200, count: 500, timestamp: "Y-m-d-H:i:s", results:[]}'
        );
        $paperendpoint = Array(
          'endpoint_name' => 'Papers',
          'description' => 'Returns papers based on parameters sent.',
          'full_url' => "http://" . $_SERVER['HTTP_HOST'] . API_BASEPATH . "papers",
          'supported_http_methods' => 'GET',
          'supported_parameters' => "ID: Number, Award: Boolean (All | Null), AuthorID: Number",
          'expected_response' => 'Status, Message, Count, Timestamp, Results',
          'expected_status_code' => ['200','204','400'],
          'example_request' => $_SERVER['HTTP_HOST'] . API_BASEPATH . "papers/awards=all",
          'example_response' => '{message: "OK", status: 200, count: 500, timestamp: "Y-m-d-H:i:s", results:[]}'
        );
        $authendpoint = Array(
          'endpoint_name' => 'Authentication',
          'description' => 'Authenticates a user and returns a JSON Web Token.',
          'full_url' => "http://" . $_SERVER['HTTP_HOST'] . API_BASEPATH . "authenticate",
          'supported_http_methods' => 'POST',
          'supported_parameters' => "Email: String, Password: String, Create: Bool, Expired: JWT",
          'expected_response' => 'Status, Message, Count, Timestamp, Results',
          'expected_status_code' => ['200','204','400','401'],
          'example_request' => $_SERVER['HTTP_HOST'] . API_BASEPATH . "authenticate" . " POST:{email: xxx@xxx.com, password: 123}",
          'example_response' => '{message: "no content", status: 204, timestamp: "Y-m-d-H:i:s", path: http-path}'
        );
        $readinglistendpoint = Array(
          'endpoint_name' => 'Reading List',
          'description' => 'If a user is authenticated, returns that user\'s list of papers on their reading list.',
          'full_url' => "http://" . $_SERVER['HTTP_HOST'] . API_BASEPATH . "readinglist",
          'supported_http_methods' => 'POST',
          'supported_parameters' => "UID: Number, Exists: Paper ID",
          'expected_response' => 'Status, Message, Count, Timestamp, Results',
          'expected_status_code' => ['200','204','400','401'],
          'example_request' => $_SERVER['HTTP_HOST'] . API_BASEPATH . "readinglist" . " POST:{token: JWTToken, add: (paper_id)}",
          'example_response' => '{message: "no content", status: 204, timestamp: "Y-m-d-H:i:s", path: http-path}'
        );
        $awardsendpoint = Array(
          'endpoint_name' => 'Awards',
          'description' => 'Displays a map between award name and award id.',
          'full_url' => "http://" . $_SERVER['HTTP_HOST'] . API_BASEPATH . "awards",
          'supported_http_methods' => 'GET',
          'supported_parameters' => "N/A",
          'expected_response' => 'Status, Message, Count, Timestamp, Results',
          'expected_status_code' => ['200','400','500'],
          'example_request' => $_SERVER['HTTP_HOST'] . API_BASEPATH . "awards",
          'example_response' => '{message: "OK", status: 200, count: 500, timestamp: "Y-m-d-H:i:s", results:[]}'
        );
        $this->generate_documentation_snub($authorendpoint);
        $this->generate_documentation_snub($paperendpoint);
        $this->generate_documentation_snub($authendpoint);
        $this->generate_documentation_snub($readinglistendpoint);
        $this->generate_documentation_snub($awardsendpoint);
    }

    //generate a snub for an endpoint in a predicatable way to follow styling
    private function generate_documentation_snub($array = []){
        $this->append_body("<div class='documentation_snub'>");
        $this->add_heading2($array['endpoint_name'],"accent-hover-underline");
        $this->add_link($array['full_url'], $array['full_url'], "full_url_link");
        $this->add_paragraph("Description: " . $array['description'], 'docu_para');
        $this->add_paragraph("Supported HTTP Methods: " . $array['supported_http_methods'], "docu_para");
        $this->add_paragraph("Supported Parameters: " . $array['supported_parameters'], "docu_para");
        $this->add_paragraph("Expected Response: " . $array['expected_response'], "docu_para");
        $this->add_paragraph("Expected Status Codes: " . implode(", ", $array['expected_status_code']), "docu_para");
        $this->add_paragraph("Example Request: " . $array['example_request'],"docu_para");
        $this->add_paragraph("Example Response: " . $array['example_response'],"docu_para");
        $this->append_body("</div><br>");
    }
}