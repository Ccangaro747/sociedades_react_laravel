<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Entidad;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    /**
     * Método para obtener entidades ordenadas por fecha de creación en orden descendente.
     * La cantidad de entidades a obtener se especifica en el parámetro 'quantity' de la solicitud.
     * Además, se transforma la URL de la foto de cada entidad para incluir la URL base del sitio.
     *
     * @param Request $request La solicitud HTTP que contiene el parámetro 'quantity'.
     * @return \Illuminate\Http\JsonResponse Respuesta JSON con las entidades obtenidas.
     */
    public function entidades(Request $request){
        // Obtener entidades ordenadas por fecha de creación en orden descendente y limitar la cantidad según el parámetro 'quantity'
        $data = Entidad::orderByDesc("created_at")->take($request->quantity)->get();

        // Transformar la URL de la foto de cada entidad para incluir la URL base del sitio
        $data->transform(function ($entidad) {
            $entidad->urlfoto = url('/img/entidad/' . $entidad->urlfoto);
            return $entidad;
        });

        // Devolver las entidades en formato JSON con un código de estado 200 (OK)
        return response()->json($data, 200);
    }

    public function categorias(){
        $data = Categoria::get();
        return response()->json($data, 200);
    }
    public function categoria($slug){
        $data = [];
        $categoria = Categoria::where('slug', $slug)->first(); // Buscar la categoría por el slug

        if (!empty($categoria)) {
            // Obtener las entidades relacionadas con esta categoría
            $entidades = $categoria->entidades()->get();

            $data = [
                'categoria' => $categoria,
                'entidades' => $entidades // Aquí se envían las entidades relacionadas
            ];

            return response()->json($data, 200);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }

}
