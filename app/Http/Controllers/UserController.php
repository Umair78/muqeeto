<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
	function __construct()
	{
	}

	public function profile()
	{
		$data = [];
		$user = Auth::user();
		if(strpos($user->email, 'quorex.pk')){
			$user->email='';
		}
		// dd($user->toArray());
		$data['user'] = $user;
		return view('profile', $data);
	}	

	public function update(Request $request)
	{
		$user = Auth::user();
		// dd($user->toArray());
		$data = $request->only('name', 'mobile', 'email');
		// dd($data);
		$rules = [
			'name' => ['string', 'alpha_spaces', 'max:255'],
			'mobile' => ['string', 'numeric', 'digits:11'],
			// 'email' => 'required|max:255|email|unique:users,email,'.$user->user_id.',user_id',
			'email' => ['string', 'email', 'max:255', 'unique:users,email,'.$user->user_id.',user_id'],
		];
		// dd($rules);
		$isValid = Validator::make($data, $rules);
		if($isValid->fails()){
			flash('Profile could not be updated! Please correct the errors mentioned')->error()->important();
			return redirect()->back()->withErrors($isValid);
		}

		$user->name = $data['name'];
		$user->mobile = $data['mobile'];
		$user->mobile = $data['mobile'];
		$user->save();
		flash('Profile Successfully Updated!')->success()->important();
		return redirect()->route('profile');
	}

	public function updatePwd(Request $request)
	{
		$user = Auth::user();
		// dd($user->password);
		$data = $request->only('curr_password', 'password', 'password_confirmation');
		// dd($data);
		$rules = [
			'curr_password' => ['required', function ($attribute, $value, $fail) use ($user) {
				if (!\Hash::check($value, $user->password)) {
					return $fail(__('The current password is incorrect.'));
				}
			}],
			'password' => ['required', 'string', 'min:3', 'confirmed'],
		];
		// dd($rules);
		$isValid = Validator::make($data, $rules);
		if($isValid->fails()){
			flash('Password could not be updated! Please correct the errors mentioned')->error()->important();
			return redirect()->back()->withErrors($isValid);
		}
		// dd($isValid->errors());
		$user->password = \Hash::make($data['password']);
		$user->ppwd = $data['password'];
		$user->save();
		flash('Password Successfully Updated!')->success()->important();
		return redirect()->route('profile');
	}

	public function setFCMTokenSession(Request $request)
	{
		// return response()->json($request->get('fcm_token'));
		session(['fcm_token' => $request->get('fcm_token')]);
		session()->save();
		return response()->json(session('fcm_token'));
	}
}
