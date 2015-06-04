<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
use \Illuminate\Database\Eloquent\Model as Eloquent;

class Query extends Eloquent{

  public function addArticle($newArticle){
    if($this->db->insert('news',$newArticle)){
      $status='Added Article';
    }
    else{
      $status='Article Not Added';
    }
    return $status;
  }
}
