<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
class News_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getItems(){
    $result = $this->db->order_by('time_posted','DESC')->get('news')->result_array();

    foreach ($result as $key => $value) {
      $time = new DateTime($value['time_posted']);
      // echo date($value['time_posted']);die;
      $year =$time->format('Y');
      $year = (int) $year;
      // var_dump($year);die;
      $month = $time->format('F');
      $newResult[$year][$month][]=$value;
    }

    $result=$newResult;
// var_dump($result);die;
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
