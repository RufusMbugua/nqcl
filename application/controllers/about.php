<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }


  function index_get(){
    $this->load->model('about_model');
    $links = $this->about_model->getLinks();
    $this->response($links);
  }
}
