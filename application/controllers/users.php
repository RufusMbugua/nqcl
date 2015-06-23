<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class Users extends MY_Controller {

  public function __construct(){
    parent::__construct();

  }

  function index_get(){
    $items = User::has('usertype')->with('usertype')->get();
    $this->response($items);
  }

  function index_post(){
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);
    if($post_data['request']=='login'){
      unset($post_data['request']);
      $result = User::has('usertype')->with('usertype')->where($post_data)->get()->toArray();
    }
    else{
      unset($post_data['request']);
      $user = new User;
      foreach( $post_data as $key => $value) {
        $user->$key = $value;
      }
      $user->password=md5(123456);
      $user->save();
      $result['type']='success';
      $result['text']='Just Added '.$user->f_name.' '.$user->l_name;
    }


    $this->response($result);
  }

  function index_put(){
    $data = $this->put();
    try{
      if($this->put('request')=='update'){
        $user = User::find($data['id']);
        // echo '<pre>';print_r($user);die;
        $user->title=$data['title'];
        $user->f_name=$data['f_name'];
        $user->l_name=$data['l_name'];
        $user->email=$data['email'];

        if($user->save()){
          $response['type']='success';
          $response['text']='User Edited';
        }
      }
      else if($this->put('request')=='delete'){
        $user = User::find($data['id']);
        $user->active=0;
        if($user->save()){
          $response['type']='success';
          $response['text']='User Disabled';
        }
      }
      else if($this->put('request')=='enable'){
        $user = User::find($data['id']);
        $user->active=1;
        if($user->save()){
          $response['type']='success';
          $response['text']='User Enabled';
        }
      }
    }
    catch(Exception $e){
      $response['type']='danger';
      $response['text']='Error '.$e->getMessage();
    }
    $this->response($response);
  }
}
