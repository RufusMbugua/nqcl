<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Services extends MY_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('services_model');
  }


  function index_get(){

    $content = $this->services_model->getContent();
    $this->response($content);
  }
}
