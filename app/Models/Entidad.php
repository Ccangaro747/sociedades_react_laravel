<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entidad extends Model
{
    use HasFactory;
    protected $guarded = []; //El uso de todos los campos por default en la base de datos.

    //Relacion uno a muchos inversa con la tabla categorias
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
    
    //Entidad se va a relacionar con el modelo users de uno a muchos inversa (muchos a uno)

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
