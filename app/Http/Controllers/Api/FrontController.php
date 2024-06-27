<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Entidad;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function entidades (Request $request){
        $data = Entidad::orderByDesc("created_at")->take($request->quantity)->get(["id", "nombre", "descripcion"]);
        return response()->json($data, 200);
    }
}
