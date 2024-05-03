<?php

//use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;


//Crear un rol para administrador
//$role = Role::create(['name' => 'admin']);
//$role = Role::create(['name' => 'client']);

Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
