<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }

  function index_get(){
    $items = Menu::has('content')->with('content')->get();

    $this->response($items);
  }
}
