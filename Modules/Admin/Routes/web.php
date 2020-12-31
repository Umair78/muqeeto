<?php

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

Route::prefix('admin')->group(function() {
	Route::get('/', function()
	{
		return redirect(route('admin.home'));
	})->name('admin.root');
	Route::get('logout', 'AdminLoginController@logout')->name('admin.logout');
	Route::get('login', 'AdminLoginController@index')->name('admin.login');
	Route::post('login', 'AdminLoginController@login')->name('admin.login.action');
	Route::get('home', 'AdminController@index')->name('admin.home');
	// companies
	Route::get('companies', 'CompanyController@index')->name('admin.companies');
	Route::post('company_edit', 'CompanyController@editCompany')->name('admin.company.edit');
	Route::post('company_update', 'CompanyController@update')->name('admin.company.update');
	Route::post('company_deactivate', 'CompanyController@deactivateCompany')->name('admin.company.delete');
	Route::post('company_reactivate', 'CompanyController@reactivateCompany')->name('admin.company.restore');
	// company_tips
	Route::get('tips', 'CompanyTipsController@index')->name('admin.tips');
	Route::post('removeCompanyTip', 'CompanyTipsController@removeCompanyTip')->name('admin.company.tip.delete');
	Route::post('addCompanyTip', 'CompanyTipsController@store')->name('admin.company.tip.add');
	Route::get('editCompanyTip/{id?}', 'CompanyTipsController@edit')->name('admin.company.tip.edit');
	Route::post('updateCompanyTip', 'CompanyTipsController@update')->name('admin.company.tip.update');
	Route::post('updateTipStatus', 'CompanyTipsController@changeStatus')->name('admin.tip.status.change');
	Route::get('updateTipSuccessStatus/{id}/{status}', 'CompanyTipsController@changeSuccessStatus')->name('admin.tip.success.status.change');
	// knowledge_center
	Route::get('kb', 'InfoController@index')->name('admin.kb');
	Route::post('kb_edit', 'InfoController@editKb')->name('admin.kb.edit');
	Route::post('kb_update', 'InfoController@update')->name('admin.kb.update');
	Route::post('kb_delete', 'InfoController@deactivateKb')->name('admin.kb.delete');
	Route::post('kb_reactivate', 'InfoController@reactivateKb')->name('admin.kb.restore');
	Route::get('kb_create', 'InfoController@create')->name('admin.kb.ceate');
	Route::post('kb_save_new', 'InfoController@store')->name('admin.kb.add');

	Route::get('userMessages', 'ContactUsController@index')->name('admin.user.messages');
	Route::post('msg_delete', 'ContactUsController@deactivateMsg')->name('admin.msg.delete');
	Route::post('msg_reactivate', 'ContactUsController@reactivateMsg')->name('admin.msg.restore');
	Route::post('msg_edit', 'InfoController@editMsg')->name('admin.msg.edit');

	Route::get('checkAdmin', 'AdminController@checkSession')->name('admin.check.auth');
});
