<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::group(['prefix' => '/{lang}/admin/'], function() {
    return view('welcome');
});*/

use \App\Models\User;
use \App\Jobs\AllUsersCaching;


/*Route::get('/create/token', function (\Illuminate\Http\Request $request) {

    $user = \App\Models\User::query()->find(1);
    $token = $user->createToken('test-token', ['server:update:delete']);

    var_dump($user->tokenCan('server:update'));

    print_r(get_class_methods($user));

    $token = $request->user()->createToken('test-token');

    var_dump($token);
});*/


use App\Models\City;
use Meilisearch\Client;

Route::get('/', function () {

    /*$client = new Client('http://localhost:7700');
    var_dump($client->version());
    die;*/



    /*$city = City::query()->find(291074);
    $city->save();*/


    //$user = User::query()->find(1);

    /*AllUsersCaching::dispatchIf(function() use ($user) {
        return (isset($user) && !empty($user));
    }, $user);*/

    //AllUsersCaching::dispatch($user)->delay(now()->addSeconds(5));


    //dispatch($allUserCachingObj);



    //\App\Jobs\AllUsersCaching::dispatch()->onQueue('default');
    //\App\Jobs\AllUsersCaching::dispatch();

    return view('welcome');
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
