<?php
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;


require_once('REST_Controller.php');

// error_reporting(1);

class MY_Controller extends REST_Controller{
var $fractal;
  public function __construct()
  {
    $this->fractal = new Manager();
    parent::__construct();
  }


}
