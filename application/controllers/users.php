<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends MY_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('users_model');
  }


  function index_get(){

    $content = $this->users_model->getUsers();
    $this->response($content);
  }

  function index_post(){
    $post_data = $this->input->post();
    $this->response($post_data);
  }
}
