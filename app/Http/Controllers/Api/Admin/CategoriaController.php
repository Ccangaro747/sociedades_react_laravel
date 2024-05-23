<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoriaController extends Controller
{
    // Método index del controlador de categorías.
    // Este método se encarga de listar todas las categorías existentes en la base de datos.
    // Las categorías se ordenan por el campo "orden" y solo se recuperan los campos "id" y "nombre".
    // Finalmente, se devuelve una respuesta HTTP con los datos en formato JSON y un código de estado 200.
    public function index()
    {
        $data = Categoria::orderBy("orden")->get(["id", "nombre"]);
        return response()->json($data, 200);
    }

    // Método store del controlador de categorías.
    // Este método se encarga de crear una nueva categoría con los datos proporcionados en la solicitud HTTP.
    // Si la solicitud incluye una imagen en formato base64, esta se procesa y se guarda en el servidor.
    // Finalmente, se guarda la nueva categoría en la base de datos y se devuelve una respuesta HTTP con los datos de la categoría en formato JSON y un código de estado 200.
    public function store(Request $request)
    {
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        $data = new Categoria($request->all());
        //Upload image base64 --> Nos va a evitar problemas con la imagen
        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //Process image, mueve la imagen a la carpeta publica
            $folderPath = "/img/categoria/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);
            //Se guarda el nombre de la imagen en la base de datos
            $data->urlfoto  =   Str::slug($request->nombre) . '.' . $image_type;
        }

        $data->slug = Str::slug($request->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    // Método show del controlador de categorías.
    // Este método se encarga de buscar una categoría específica por su ID en la base de datos.
    // Si la categoría se encuentra, se devuelve una respuesta HTTP con los datos de la categoría en formato JSON y un código de estado 200.
    // Para que la API devuelva un código de estado 404 (Not Found) cuando no se encuentra una categoría, se puede usar el método findOrFail en lugar de find
    public function show($id)
    {
        $data = Categoria::find($id);
        return response()->json($data, 200);
    }

    // Método update del controlador de categorías.
    // Este método se encarga de actualizar una categoría existente con los datos proporcionados en la solicitud HTTP.
    // Si la solicitud incluye una imagen en formato base64, esta se procesa y se guarda en el servidor.
    // Finalmente, se guarda la categoría actualizada en la base de datos y se devuelve una respuesta HTTP con los datos de la categoría en formato JSON y un código de estado 200.
    public function update(Request $request, $id)
    {
        //Acá se puede realizar una validación de los datos que llegan en la petición si es necesario...
        //Ej; $request->validate(['nombre' => 'required']);
        $data = Categoria::find($id);
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
        $data->slug = Str::slug($request->nombre);
        $data->save();
        return response()->json($data, 200);
    }

    // Método destroy del controlador de categorías.
    // Este método se encarga de eliminar una categoría específica por su ID de la base de datos.
    // Si la categoría se encuentra y se elimina correctamente, se devuelve una respuesta HTTP con un mensaje de éxito en formato JSON y un código de estado 200.
    public function destroy($id)
    {
        $data = Categoria::find($id);
        $data->delete();
        return response()->json("Categoría eliminada", 200);
    }
}
