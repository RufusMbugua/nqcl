<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent{

 public function usertype()
     {
         return $this->belongsTo('UserType');
     }
}
