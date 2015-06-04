<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class Pages extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }

  function index_get(){
    if($this->get('id')){
      $items = Menu::has('content')->with('content')->where('menus.id',$this->get('id'))->get();
    }
    else{
      $items = Menu::has('content')->with('content')->get();
    }


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
    if($this->put('request')=='update'){


      $content = Content::find($data['content'][0]['id']);
      // print_r($data['content']);
      $content->body=$data['content'][0]['body'];
      $content->save();
    }
    else if($this->put('request')=='delete'){
      $content = Menu::find($data['id']);
      $content->active=0;
      $content->save();
    }
    else if($this->put('request')=='enable'){
      $content = Menu::find($data['id']);
      $content->active=1;
      $content->save();
    }
    $this->response($content);
  }

  function index_delete(){

    // $data=$this->post();
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);

    var_dump($post_data);die;
    $menu = Menu::find($data['id']);
    $menu->active=0;
    $menu->save();
    $this->response($menu);
  }
}
