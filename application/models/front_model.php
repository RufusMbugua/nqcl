<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Front_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getContent(){
    $result = $this->db->get('home_n_services')->result_array();
    return $result;
  }
}
