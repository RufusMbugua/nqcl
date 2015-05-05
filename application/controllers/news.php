<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }


  function index_get(){
    $this->load->model('news_model');
    $items = $this->news_model->getItems();
    $this->response($items);
  }
}
