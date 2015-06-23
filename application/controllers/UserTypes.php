<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class UserTypes extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }

  function index_get(){
  	
$items = UserType::all();
$this->response($items);
  }

}