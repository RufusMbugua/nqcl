<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class Queries extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }

  /**
  * [index_get description]
  * @return [type] [description]
  */
  function index_get(){
    $items = Query::all();

    $this->response($items);
  }

  function if_unique(){
    // $record = Query:where('email','=','')->get()->result_array();
  }
  /**
  * [index_post description]
  * @return [type] [description]
  */
  function index_post(){
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);

    // var_dump($post_data);die;

    $query = new Query();

    $query->email = $post_data['email'];
    $query->message = $post_data['message'];
    $query->status = 0;
    try{
      if($query->save()){
        $response['type']='success';
        $response['text']="Query Sent";
      }
    }
    catch(Exception $e){
      $response['type']='danger';
      $response['text']="Error ".$e->getCode()." :  Query Not Sent";
    }

    $this->response($response);
  }

  /**
  * [index_put description]
  * @return [type] [description]
  */
  function index_put(){
    $data=$this->put();
    // echo '<pre>';print_r($data);die;
    $content = Content::find($data['content'][0]['id']);
    // print_r($data['content']);
    $content->body=$data['content'][0]['body'];
    $content->save();
    $this->response($content);
  }

  /**
  * [index_delete description]
  * @return [type] [description]
  */
  function index_delete(){
    $data=$this->delete();
    var_dump($data);die;
    $menu = Menu::find($data['id']);
    $menu->active=0;
    $menu->save();
    $this->response($menu);
  }
}
