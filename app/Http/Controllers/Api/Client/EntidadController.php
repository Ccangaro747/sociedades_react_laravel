<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Entidad;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class EntidadController extends Controller
{
    public function index(){
        $data = Entidad::whereUser_id(auth()->user()->id)->orderBy("orden")->get(["id", "orden", "nombre"]);
        return response()->json($data, 200);
    }
    public function store(Request $request)
    {
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        $data = new Entidad($request->all());
        //Upload image base64 --> Nos va a evitar problemas con la imagen
        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //Process image, mueve la imagen a la carpeta publica
            $folderPath = "/img/entidad/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);
            //Se guarda el nombre de la imagen en la base de datos
            $data->urlfoto  =   Str::slug($request->nombre) . '.' . $image_type;
        }
        $data->user_id = auth()->user()->id;
        $data->save();
        return response()->json($data, 200);
    }
    public function show($id)
    {
        $data = Entidad::find($id);
        return response()->json($data, 200);
    }
    public function update(Request $request, $id)
    {
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        //Ej; $request->validate(['nombre' => 'required']);
        $data = Entidad::find($id);
        $data->fill($request->all());
        //Upload image base64
        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //Process image
            $folderPath = "/img/categoria/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto  =   Str::slug($request->nombre) . '.' . $image_type;
        }
        $data->save();
        return response()->json($data, 200);
    }
}
