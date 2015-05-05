<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getItems(){
    $result = $this->db->get('news')->result_array();
    return $result;
  }
}
