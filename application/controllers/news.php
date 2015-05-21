<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;

class News extends MY_Controller {

  public function __construct(){
    parent::__construct();
  }


  function index_get(){
    $articles = Article::all()->toArray();
    $newResult=array();

    foreach ($articles as $key => $article) {
      /**
      * Get Today's Date
      * @var DateTime
      */
      $today=new DateTime();
      /**
      * Get Time Article was Posted
      * @var DateTime
      */
      $time = new DateTime($article['time_posted']);

      /**
      * Get Time Interval
      * @var [type]
      */
      $interval = (int) $today->diff($time)->format('%i');;
      // $interval = $interval->format('%i');

      if($interval<10){
        $value['new']=true;
      }

      $year =(int)$time->format('Y');

      $month = $time->format('F');
      $newResult[$year][$month][]=$article;
    }

    $this->response($newResult);
  }

  function index_post(){
    $post_data = file_get_contents("php://input");
    $post_data = json_decode($post_data,true);

    $article = new Article();

    $article->title = $post_data['title'];
    $article->type = $post_data['type'];
    $article->body = $post_data['body'];


    if($article->save()){
      $this->response('Article Saved');
    }
    else{
      $this->response('Article Not Saved');
    }

  }
}
