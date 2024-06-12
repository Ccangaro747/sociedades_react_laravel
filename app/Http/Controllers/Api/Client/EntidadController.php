<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Entidad;
use Illuminate\Http\Request;

class EntidadController extends Controller
{
    public function index(){
        $data = Entidad::whereUser_id(auth()->user()->id)->orderBy("orden")->get(["id", "orden", "nombre"]);
        return response()->json($data, 200);
    }
}
