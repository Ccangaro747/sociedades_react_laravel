<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request) // Este método se utiliza para registrar un nuevo usuario en la aplicación. Recibe los datos del formulario de registro y crea una nueva cuenta de usuario en la base de datos. Request es una clase que representa la solicitud HTTP y se utiliza para acceder a los datos enviados por el usuario.
    {
        // Inicializa la respuesta con un indicador de éxito establecido en "false". Esto se utilizará para indicar si el registro fue exitoso o no.
        $response = ["success" => false];
        //Validacion
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        // Recoge todos los datos del formulario de la solicitud.
        $input = $request->all();
        // Encripta la contraseña proporcionada por el usuario.
        $input["password"] = bcrypt($input['password']);
        // Crea un nuevo usuario en la base de datos con los datos proporcionados. Bcrypt es una función de hash de contraseñas que se utiliza para almacenar contraseñas de forma segura en la base de datos.
        $user = User::create($input);
        // Asigna el rol 'admin' al usuario recién creado. assignRole es un método proporcionado por el paquete de permisos de Spatie que se utiliza para asignar un rol a un usuario.
        $user->assignRole('client');
        // Establece el indicador de éxito en "true" ya que el usuario se ha creado correctamente.
        $response["success"] = true;
        // Genera un token de autenticación para el usuario recién registrado. plainTextToken es un método proporcionado por Sanctum que se utiliza para generar un token de autenticación para el usuario.
        //$response["token"] = $user->createToken("myApp")->plainTextToken;
        // Devuelve una respuesta JSON con el indicador de éxito y el token de autenticación.
        return response()->json($response, 200);
    }

    public function login(Request $request)
    {
        // Inicializa la respuesta con un indicador de éxito establecido en "false". Esto se utilizará para indicar si el registro fue exitoso o no.
        $response = ["success" => false];
        //Validacion
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = auth()->user();
            $user->hasRole('client'); //Verifica si el usuario tiene el rol de cliente

            $response['token'] = $user->createToken('myApp')->plainTextToken;
            $response['user'] = $user;
            $response['success'] = true;
        }
        return response()->json($response, 200);
    }
}
