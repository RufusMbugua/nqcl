<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getUser($data){
    $result = $this->db->get_where('users',$data)->result_array();
    return $result;
  }

}
