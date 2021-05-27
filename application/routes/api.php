<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware' => ['auth:sanctum']], function () {
//     Route::post('/updateDiary', 'User\UserController@updateDiary');
//     Route::post('/getDiary', 'User\UserController@getDiary');
//     Route::post('/getDiaryById', 'User\UserController@getDiaryById');
//     Route::post('/register', 'User\UserController@register');
//     Route::post('/logout', 'User\UserController@logout');
// });

Route::post('/login', 'User\UserController@login');
Route::post('/updateDiary', 'User\UserController@updateDiary');
Route::post('/getDiary', 'User\UserController@getDiary');
Route::post('/getDiaryById', 'User\UserController@getDiaryById');
Route::post('/deleteEntry', 'User\UserController@deleteEntry');
Route::post('/register', 'User\UserController@register');
Route::post('/logout', 'User\UserController@logout');

