<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Africa/Nairobi');
use \Illuminate\Database\Eloquent\Model as Eloquent;

class Article extends Eloquent{

  /**
  * Get all Links for About Page
  */
  public function scopeAll(){
    $result = Article::orderBy('time_posted','DESC')->get('news')->toArray();
    $newResult=array();
    foreach ($result as $key => $value) {

      $today=new DateTime();

      $time = new DateTime($value['time_posted']);


      $interval = $today->diff($time);
      $interval = $interval->format('%i');
      if($interval<10){
        $value['new']=true;
      }
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
