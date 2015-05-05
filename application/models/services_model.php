<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Services_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getContent(){
    $result = $this->db->get_where('home_n_services',array('data_type'=>'OUR SERVICES'))->result_array();
    return $result;
  }
}
