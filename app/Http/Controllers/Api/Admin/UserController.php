<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //index -> Listar todos los usuarios
    public function index()
    {
        $data = User::whereHas('roles', function($q){
            $q->where('name', 'client');
        })->get(["id", "name"]);
        return response()->json($data, 200);
    }

    public function store(Request $request){

    }

    //show -> Mostrar un usuario específico
    public function show($id){
        $data = User::find($id);
        if($data){
            return response()->json($data, 200);
        }else{
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    //update -> Actualizar un usuario específico
    public function update(Request $request, $id){
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        //Ej; $request->validate(['nombre' => 'required']);
        $data = User::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }
}
