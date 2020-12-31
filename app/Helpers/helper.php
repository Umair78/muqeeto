<?php
use App\Models\Defaults;

function checkAdminAuth()
{
	$user = session()->has('admin') ? session('admin') : false;
	if($user){
		if($user->group_key == 'ADMIN'){
			return $user;
		} else{
			return 'NoAdmin';
		}
	}
	return false;
}

function echoActiveClassIfRequestMatchesAdmin($requestUri)
{
	if (Request::segment(2) == $requestUri){
		echo 'class="nav-item active"' . (new Illuminate\Http\Request)->segment(1);
	}
	else{
		echo 'class="nav-item"';
	}
}

function cleanJson_forSave($str)
{
	$str = str_replace('{', '', $str);
	$str = str_replace('}', '', $str);
	$str = str_replace('[', '{', $str);
	$str = str_replace(']', '}', $str);
	return $str;
}

function cleanJson_forShow($str)
{
	$str = str_replace('{', '', $str);
	$str = str_replace('}', '', $str);
	$str = str_replace(':', ' ', $str);
	$str = str_replace('"', '', $str);
	$str = str_replace(',', '<br>', $str);
	return $str;
}

function get_contactUs_details()
{
	$defaults = Defaults::all();
	return $defaults;
}

function saveVisit()
{
	$ip = \Request::Ip();
	$tbl = \App\Models\VisitsCounter::firstOrNew(['ip'=> $ip]);
	$tbl->ctr += 1;
	$tbl->save();
	// dd($tbl->toArray());
}

function showVisits()
{
	$sum = \App\Models\VisitsCounter::count('ctr');
	return $sum;
}

function getUsersFCMs()
{
	$users = \App\User::whereNotNull('fcm_token')->get('fcm_token');
	return $users->toArray();
}

function saveUserFCM()
{
	$user = \Auth::user();
	if($user && session()->has('fcm_token')){
		$user->fcm_token = session('fcm_token');
		$user->save();
		return $user->toArray();
	}
	return NULL;
}