<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContinentController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\MultimediaController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\JobsGroupController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CategoryController;

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
Route::prefix('/{lang}/admin')->middleware('auth:sanctum')->group(function () {

    Route::get('/expenses/paginate/list', [ExpenseController::class, 'index'])->name('expenses.all');
    Route::post('/expenses/create', [ExpenseController::class, 'store'])->name('expenses.store');

    Route::delete('/expenses/delete/{id}', [ExpenseController::class, 'delete']);

    Route::get('/expenses/edit/{id}', [ExpenseController::class, 'show'])->name('expenses.show');
    Route::put('/expenses/edit/{id}', [ExpenseController::class, 'edit'])->name('expenses.edit');


    // User Module
    Route::post('/user/change/avatar', [UserController::class, 'changeAvatar']);
    Route::post('/user/check/login', [UserController::class, 'checkLogin'])->name('check-login');
    Route::post('/user/logout', [LoginController::class, 'logout']);


    // Settings Module
    Route::post('/settings/continents/list', [ContinentController::class, 'index'])->name('continents.list');
    Route::post('/settings/continents/all', [ContinentController::class, 'all'])->name('continents.all');

    Route::post('/settings/countries/list', [CountryController::class, 'index'])->name('countries.list');
    Route::post('/settings/countries/all', [CountryController::class, 'all'])->name('countries.all');

    Route::post('/settings/cities/list', [CityController::class, 'index'])->name('cities.list');
    Route::post('/settings/cities/all', [CityController::class, 'all'])->name('cities.all');


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


    // Persons Module
    Route::post('/person/create', [PersonController::class, 'create']);
    Route::get('/person/paginate/list', [PersonController::class, 'paginateList']);

    // Jobs Module
    Route::post('/jobs/group/create', [JobsGroupController::class, 'create']);
    Route::get('/jobs/groups/paginate/list', [JobsGroupController::class, 'paginateList']);
    Route::get('/jobs/groups/all', [JobsGroupController::class, 'getAll']);
    Route::put('/jobs/group/status/toggle', [JobsGroupController::class, 'toggleStatus']);
    Route::delete('/jobs/group/delete/{id}', [JobsGroupController::class, 'delete']);
    Route::get('/jobs/group/find/{id}', [JobsGroupController::class, 'findById']);
    Route::post('/jobs/group/edit/{id}', [JobsGroupController::class, 'edit']);
    Route::delete('/jobs/group/delete/image/{jobs_group_id}', [JobsGroupController::class, 'deleteMainImage']);

    Route::post('/jobs/job/add', [JobController::class, 'add']);
    Route::get('/jobs/jobs/list', [JobController::class, 'paginateList']);


    // Categories Module
    Route::post('/categories/list', [CategoryController::class, 'list']);
    Route::post('/categories/all', [CategoryController::class, 'all']);

    Route::post('/category/create', [CategoryController::class, 'create']);
    Route::put('/category/edit/{id}', [CategoryController::class, 'edit']);
    Route::delete('/category/delete/{id}', [CategoryController::class, 'delete']);
});

Route::post('/{lang}/admin/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'store']);
