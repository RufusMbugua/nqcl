<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Content extends MY_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('content_model');
  }


  function index_get(){
    $items = $this->content_model->getMenus();
    $this->response($items);
  }
}
