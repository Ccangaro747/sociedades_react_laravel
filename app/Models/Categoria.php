<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    //Relacion uno a muchos con la tabla entidad
    public function entidads()
    {
        return $this->hasMany(Entidad::class);
    }
}
