<?php
use \Illuminate\Database\Eloquent\Model as Eloquent;

class UserType extends Eloquent{

public function users()
    {
        return $this->hasMany('User');
    }
}
