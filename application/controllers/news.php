<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }


  function index_get(){
    $items = Article::all()->all();
    $this->response($items);
  }

  function index_post(){
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);
    $result = $this->news_model->addArticle($post_data);


    $this->response($result);
  }
}
