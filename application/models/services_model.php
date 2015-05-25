<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Services_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getContent(){
    $result = $this->db->join('menus','menu_id = menus.id')->get_where('content',array('menus.name'=>'Our Services'))->result_array();
    return $result;
  }
}
