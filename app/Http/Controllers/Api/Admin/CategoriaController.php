<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
    //index -> Listar todos los usuarios
    public function index()
    {
        $data = Categoria::orderBy("orden")->get(["id", "nombre"]);
        return response()->json($data, 200);
    }

    //store ->
    public function store(Request $request)
    {
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        $data = new Categoria($request->all());
        //Upload image base64
        if($request->urlfoto){
            $img = $request->urlfoto;
            //Process image
            $folderPath = "/img/categoria/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.'.$image_type;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto  =   Str::slug($request->nombre) . '.'.$image_type;
        }

        $data->slug = Str::slug($request->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    //show -> Mostrar un usuario específico
    public function show($id){
        $data = Categoria::find($id);
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
        $data = Categoria::find($id);
        $data->fill($request->all());
        //Upload image base64
        if($request->urlfoto){
            $img = $request->urlfoto;
            //Process image
            $folderPath = "/img/categoria/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.'.$image_type;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto  =   Str::slug($request->nombre) . '.'.$image_type;
        }
        $data->slug = Str::slug($request->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    //destroy -> Eliminar una categoría específica
    public function destroy($id){
        $data = Categoria::find($id);
        $data->delete();
        return response()->json("Categoría elimninada", 200);
    }
}
