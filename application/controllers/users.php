<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }


  function index_get(){

    $content = User::find(2);
    $this->response($content);
  }

  function index_post(){
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);

    $result = User::where($post_data)->get()->toArray();

    $this->response($result);
  }
}
