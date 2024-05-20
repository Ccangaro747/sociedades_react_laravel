<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\EntidadController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\Client\EntidadController as EmpresaClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){

//PUBLIC<--

//::public

//Las rutas publicas son accesibles para cualquier usuario, no requieren autenticación.

Route::get('/public/{slug}', [FrontController::class,'categoria']); // Esta ruta se utiliza para mostrar una categoría específica en la parte pública de la aplicación. El parámetro 'slug' se utiliza para identificar de manera única la categoría que se va a mostrar. El controlador 'FrontController' y su método 'categoria' se encargan de procesar la solicitud.

//::auth

//Tambien es una ruta publica los formularios de registro y login.

Route::get('/auth/register', [AuthController::class,'register']); // Esta ruta se utiliza para mostrar el formulario de registro en la parte pública de la aplicación. El controlador 'AuthController' y su método 'register' se encargan de procesar la solicitud.
Route::get('/auth/login', [AuthController::class,'login']); // Esta ruta se utiliza para mostrar el formulario de inicio de sesión en la parte pública de la aplicación. El controlador 'AuthController' y su método 'login' se encargan de procesar la solicitud.

//PRIVATE<--

//::privada

//Las rutas privadas son accesibles solo para usuarios autenticados, requieren autenticación.

//Utilizamos el middleware 'auth:sanctum' para proteger las rutas privadas. Este middleware verifica si el usuario está autenticado antes de permitir el acceso a la ruta.

Route::group(['middleware' => 'auth:sanctum'], function(){

    //::auth

    //Logout por que es una ruta privada y se necesita autenticación.

    Route::post('/auth/logout', [AuthController::class,'logout']);

    //::ruta del rol cliente

    //Client por que es una ruta privada y se necesita autenticación.

    Route::apiResource('/client/entidad', EntidadController::class); //apiResource es un método que crea automáticamente las rutas para un recurso RESTful. En este caso, estamos creando las rutas para el recurso 'entidad' del controlador 'EntidadController'. Estas rutas permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades de la aplicación.

    //::ruta del rol admin

    //Admin por que es una ruta privada y se necesita autenticación.

    Route::apiResource('/admin/user', UserController::class);
    Route::apiResource('/admin/categoria', CategoriaController::class);
    Route::apiResource('/admin/entidad', EmpresaClient::class);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
});
