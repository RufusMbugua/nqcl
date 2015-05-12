<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Content_Model extends CI_Model{

  /**
  * Get all Links for About Page
  */
  public function getMenus(){
    $result = $this->db->get('menus')->result_array();
    return $result;
  }
}
