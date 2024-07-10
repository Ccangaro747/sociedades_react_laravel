<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\EntidadController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\Client\EntidadController as EmpresaClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {


    //PUBLIC<--

    //Las rutas publicas son accesibles para cualquier usuario, no requieren autenticación.

    Route::get('/public/entidades/{quantity}', [FrontController::class, 'entidades']);
    Route::get('/public/categorias', [FrontController::class, 'categorias']);
    //Route::get('/public/{slug}', [FrontController::class, 'categoria']); // Esta ruta se utiliza para mostrar una categoría específica en la parte pública de la aplicación. El parámetro 'slug' se utiliza para identificar de manera única la categoría que se va a mostrar. El controlador 'FrontController' y su método 'categoria' se encargan de procesar la solicitud.


    //::AUTH

    //Tambien es una ruta publica los formularios de registro y login.

    Route::post('/auth/register', [AuthController::class, 'register']); // Esta ruta se utiliza para mostrar el formulario de registro en la parte pública de la aplicación. El controlador 'AuthController' y su método 'register' se encargan de procesar la solicitud.
    Route::post('/auth/login', [AuthController::class, 'login']); // Esta ruta se utiliza para mostrar el formulario de inicio de sesión en la parte pública de la aplicación. El controlador 'AuthController' y su método 'login' se encargan de procesar la solicitud.

    //Rutas para el restablecimiento de contraseña
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');
    /*

    Las rutas de registro y login se cambiaron del GET a POST porque estas rutas están diseñadas para recibir datos del usuario (como el correo electrónico y la contraseña) y luego realizar una acción con esos datos (crear una cuenta o iniciar sesión).

    En el caso del registro, los datos del formulario de registro se envían al servidor, donde se crea una nueva cuenta de usuario. En el caso del inicio de sesión, los datos del formulario de inicio de sesión se envían al servidor, donde se verifica la identidad del usuario.

    En contraste, el método GET se utiliza para solicitar datos del servidor. No se debería usar GET para el registro o el inicio de sesión porque estos procesos implican el envío de datos sensibles (como contraseñas) al servidor, y GET no es seguro para este propósito porque los datos enviados con GET se añaden a la URL y pueden ser vistos en el historial del navegador, los registros del servidor, etc.

    Por lo tanto, es una práctica común y recomendada utilizar POST para las rutas de registro y login.

    */


    //PRIVATE<--

    //::privada

    //Las rutas privadas son accesibles solo para usuarios autenticados, requieren autenticación.

    //Utilizamos el middleware 'auth:sanctum' para proteger las rutas privadas. Este middleware verifica si el usuario está autenticado antes de permitir el acceso a la ruta.

    Route::group(['middleware' => 'auth:sanctum'], function () {

        //::auth

        //Logout por que es una ruta privada y se necesita autenticación.

        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //::ruta del rol cliente

        //Client por que es una ruta privada y se necesita autenticación.

        Route::apiResource('/client/entidad', EmpresaClient::class); //apiResource es un método que crea automáticamente las rutas para un recurso RESTful. En este caso, estamos creando las rutas para el recurso 'entidad' del controlador 'EntidadController'. Estas rutas permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades de la aplicación.

        //::ruta del rol admin

        //Admin por que es una ruta privada y se necesita autenticación.

        Route::apiResource('/admin/user', UserController::class);
        Route::apiResource('/admin/categoria', CategoriaController::class);
        Route::apiResource('/admin/entidad', EntidadController::class);

        //ApiResource es un método que crea automáticamente las rutas para un recurso RESTful. En este caso, estamos creando las rutas para los recursos 'user', 'categoria' y 'entidad' de los controladores correspondientes. Estas rutas permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los usuarios, categorías y entidades de la aplicación.

    });

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});
