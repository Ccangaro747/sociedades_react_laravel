<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    /**
     * Obtener las entidades asociadas a esta categoría.
     */
    public function entidades()
    {
        return $this->hasMany(Entidad::class);
    }
}
