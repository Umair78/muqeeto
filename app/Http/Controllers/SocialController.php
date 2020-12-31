<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use Auth;
use App\User;

class SocialController extends Controller
{
	public function __construct(){
		$this->middleware('guest')->except('logout');
	}
	public function redirect($provider)
	{
		return Socialite::driver($provider)->redirect();
	}

	public function Callback($provider)
	{
		 $user = Socialite::driver($provider)->stateless()->user();
		 //return $user->token;
     
			$finduser = User::where('provider_id', $user->id)->first();
			//return $user->token;
		// dd($users->toArray());
		if($finduser){
			$usr = Auth::login($finduser);
			// dd(Auth::user()->toArray());
			return redirect('home');
		}else{
			$user = User::create([
				'name' => $user->name,
				'email' => ($user->email ?? $user->getId().'@quorex.pk'),
				//'image' => $user->getAvatar(),
				'provider_id' => $user->id,
				'provider' => strtoupper($provider),

			]);
			$usr = Auth::login($user);
			return redirect()->route('home');
		}
	}
}
