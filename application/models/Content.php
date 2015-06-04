<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Illuminate\Database\Eloquent\Model as Eloquent;
date_default_timezone_set('Africa/Nairobi');
class Content extends Eloquent{

  /**
  * Get all Links for About Page
  */
  public function menu()
     {
         return $this->belongsTo('Menu');
     }


  public function getMenus(){
    $result = $this->db->get('menus')->result_array();
    return $result;
  }

  public function getContent(){
    $result = $this->db->join('menus','menu_id = menus.id')
    ->get('content')->result_array();
    return $result;
  }
}
