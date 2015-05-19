<?php

class Downloads extends MY_Controller{

  public function __construct(){
    parent::__construct();
  }

  function index_get(){
    $parent_folder = 'files/';
      $data = get_dir_file_info($parent_folder);

      foreach($data as $image){
        $newArray[]=array('name'=>$image['name'],'url'=>$image['relative_path'].$image['name'],'mime'=>get_mime_by_extension($image['name']));
      }
    $this->response($newArray);
  }
}
