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
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);
    $result = $this->users_model->getUser($post_data);


    $this->response($result);
  }
}
