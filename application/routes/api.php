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

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::group(['namespace' => 'User', 'prefix' => 'user'], function () {
        Route::post('/logout', 'UserController@logout');
    });

    Route::group(['namespace' => 'Main', 'prefix' => 'main'],function () {
        Route::post('/getMenu', 'MainController@getMenu');
    });

    Route::group(['namespace' => 'Diary', 'prefix' => 'diary'], function () {
        Route::post('/updateDiary', 'DiaryController@updateDiary');
        Route::post('/getDiary', 'DiaryController@getDiary');
        Route::post('/getDiaryById', 'DiaryController@getDiaryById');
        Route::post('/register', 'DiaryController@register');
        Route::post('/deleteEntry', 'DiaryController@deleteEntry');
        Route::post('/logout', 'DiaryController@logout');
    });
});

Route::group(['namespace' => 'User', 'prefix' => 'user'], function () {
    Route::post('/login', 'UserController@login');
});

