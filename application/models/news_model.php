<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class News_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getItems(){
    $result = $this->db->get('news')->result_array();
    return $result;
  }

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
