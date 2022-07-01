<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContinentController;
use App\Http\Controllers\MultimediaController;

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

Route::middleware('cors:auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// '[email protected]'
Route::prefix('/{lang}/admin/user')->middleware('auth:sanctum')->group(function () {

    Route::get('/expenses', [ExpenseController::class, 'index'])->name('expenses.all');
    Route::post('/expense/create', [ExpenseController::class, 'store'])->name('expenses.store');

    Route::delete('/expense/delete/{id}', [ExpenseController::class, 'delete']);

    Route::get('/expense/edit/{id}', [ExpenseController::class, 'show'])->name('expenses.show');
    Route::put('/expense/edit/{id}', [ExpenseController::class, 'edit'])->name('expenses.edit');


    Route::post('/change/avatar', [UserController::class, 'changeAvatar']);

    Route::post('/check/login', [UserController::class, 'checkLogin'])->name('check-login');
    Route::post('/logout', [LoginController::class, 'logout']);


    // Settings Module
    Route::get('/settings/continent/list', [ContinentController::class, 'index'])->name('continents.list');




    // Multimedia Module
    Route::post('/multimedia/directory/map', [MultimediaController::class, 'directoryMap']);
    Route::post('/multimedia/add/video', [MultimediaController::class, 'addVideo']);

    Route::post('/multimedia/video/create/folder', [MultimediaController::class, 'createFolder']);
    Route::post('/multimedia/video/move/item/{id}', [MultimediaController::class, 'moveItem']);
    Route::post('/multimedia/video/rename/item/{id}', [MultimediaController::class, 'renameItem']);
    Route::post('/multimedia/video/delete/item/{id}', [MultimediaController::class, 'deleteItem']);

    Route::post('/multimedia/image/create/folder', [MultimediaController::class, 'createFolder']);
    Route::post('/multimedia/image/move/item/{id}', [MultimediaController::class, 'moveItem']);
    Route::post('/multimedia/image/rename/item/{id}', [MultimediaController::class, 'renameItem']);
    Route::post('/multimedia/image/delete/item/{id}', [MultimediaController::class, 'deleteItem']);

    Route::post('/multimedia/sound/create/folder', [MultimediaController::class, 'createFolder']);
    Route::post('/multimedia/sound/move/item/{id}', [MultimediaController::class, 'moveItem']);
    Route::post('/multimedia/sound/rename/item/{id}', [MultimediaController::class, 'renameItem']);
    Route::post('/multimedia/sound/delete/item/{id}', [MultimediaController::class, 'deleteItem']);
});

Route::post('/{lang}/admin/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'store']);
