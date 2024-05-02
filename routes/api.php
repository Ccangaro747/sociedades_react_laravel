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
//PUBLIC

//::public

// Esta ruta se utiliza para mostrar una categoría específica en la parte pública de la aplicación.
// El parámetro 'slug' se utiliza para identificar de manera única la categoría que se va a mostrar.
// El controlador 'FrontController' y su método 'categoria' se encargan de procesar la solicitud.

Route::get('/public/{slug}', [FrontController::class,'categoria']);

//::auth
Route::get('/auth/register', [AuthController::class,'register']);
Route::get('/auth/login', [AuthController::class,'login']);

//PRIVATE

//::privada

Route::group(['middleware' => 'auth:sanctum'], function(){

    //::auth

    Route::post('/auth/logout', [AuthController::class,'logout']);

    //::ruta del rol cliente

    Route::apiResource('/client/entidad', EntidadController::class);

    //::ruta del rol admin

    Route::apiResource('/admin/user', UserController::class);
    Route::apiResource('/admin/categoria', CategoriaController::class);
    Route::apiResource('/admin/entidad', EmpresaClient::class);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
});
