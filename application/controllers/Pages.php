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

  function about_get(){
    $items = About::all();

    $this->response($items);
  }

  function about_put(){
    $data=$this->put();
    // var_dump($data);die;
    $about = About::find($data['id']);

    $about->about_body=$data['about_body'];
    $about->about_type=$data['about_type'];
    $about->save();
    $this->response($about);
  }

  function index_put(){
    $data=$this->put();
    // echo '<pre>';print_r($data);die;
    $content = Content::find($data['content'][0]['id']);
    // print_r($data['content']);
    $content->body=$data['content'][0]['body'];
    $content->save();
    $this->response($content);
  }

  function index_delete(){

    $data=$this->delete();
    var_dump($data);die;
    $menu = Menu::find($data['id']);
    $menu->active=0;
    $menu->save();
    $this->response($menu);
  }
}
