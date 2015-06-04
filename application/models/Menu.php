<?php
use \Illuminate\Database\Eloquent\Model as Eloquent;

class Menu extends Eloquent{

  public function content()
    {
        return $this->hasMany('Content');
    }
  //   public function scopeEagerLoadAll($query){
  //         return $query->with('Content');
  // }
}
