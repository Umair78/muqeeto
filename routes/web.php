<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use Laravel\Socialite\Facades\Socialite;

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

Route::get('/', function () {
	return redirect(route('home'));
});
Route::get('home', 'HomeController@index')->name('home');
Route::get('disclaimer', 'HomeController@disclaimer')->name('disclaimer');
Route::get('about-us', 'HomeController@aboutUs')->name('about-us');
Route::get('why-us', 'HomeController@whyUs')->name('why-us');
Route::get('our-offerings', 'HomeController@ourOfferings')->name('our-offerings');
Route::get('mistakes', 'HomeController@commonMistakes')->name('mistakes');
Route::get('privacypolicy', 'HomeController@privacyPolicy')->name('privacypolicy');
Route::get('contactUs', 'HomeController@contact_us')->name('contact-us');
Route::get('checkForUpdates', 'HomeController@updateChecker')->name('check.updates');
Route::post('setFCMToken', 'UserController@setFCMTokenSession')->name('setFCMToken');
Auth::routes();

Route::get('login/{provider}', 'SocialController@redirect');
Route::get('login/{provider}/callback','SocialController@Callback');

Route::post('contact-us', 'HomeController@contactUs')->name('contactUs');


Route::get('registor', 'Auth\RegisterController@registor');




Route::middleware('auth')->group(function () {
	Route::get('profile', 'UserController@profile')->name('profile');
	Route::post('updateProfile', 'UserController@update')->name('profile.update');
	Route::post('updatePassword', 'UserController@updatePwd')->name('profile.changepwd');
	Route::get('tips', 'HomeController@tips')->name('tips');
	Route::get('companies', 'CompaniesController@index')->name('companies');
	Route::get('news/{date?}/{company?}', 'HomeController@news')->name('news');
    Route::get('logout', 'Auth\LoginController@logout')->name('logout');
});

Route::fallback(function(){
	return redirect()->back();
});
