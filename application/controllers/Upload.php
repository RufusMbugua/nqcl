<?php

/**
 *
 */
class Upload extends MY_Controller
{

  function __construct()
  {
    parent::__construct();
    # code...
  }

  public function index_get()
  {
    # code...
  }
  public function index_post(){
    var_dump($_FILES);
  }

}
