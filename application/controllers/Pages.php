<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class Pages extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }

  function index_get(){
    $items = Menu::has('content')->with('content')->get();

    $this->response($items);
  }

  function index_put(){
    $data=$this->put();
    $content = Content::find($data['id']);
    // print_r($data['content']);
    $content->body=$data['content'][0]['body'];
    $content->save();
    $this->response($content);
  }
}
