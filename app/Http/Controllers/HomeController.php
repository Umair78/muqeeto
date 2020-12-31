<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyTip;
use App\Models\ContactUs;
use App\Models\Defaults;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
	public function index()
	{
		$user = Auth::user();
		// dd($user);
		$data = [];
		$tips = CompanyTip::with('company', 'company.sector')->orderBy('created_at', 'DESC')->withTrashed()->get();
		$date = Carbon::now()->toDateString();
		$news = News::with('news_category')->orderBy('created_at', 'DESC')->limit(5)->get();
		// dd($news->toArray());
		$defaults = Defaults::all();
		$data['aboutUs'] = $defaults->where('key', 'aboutUs')->pluck('value')->first();
		$data['home_mission'] = $defaults->where('key', 'home_mission')->pluck('value')->first();
		$data['home_vision'] = $defaults->where('key', 'home_vision')->pluck('value')->first();
		$data['tips'] = $tips;
		$data['news'] = $news;
		$data['user'] = $user;
		return view('home', $data);
	}

	public function tips()
	{
		$user = Auth::user();
		$data = [];
		$tips = CompanyTip::with('company', 'company.sector')->withTrashed()->get();
		$data['tips'] = $tips;
		$data['user'] = $user;
		return view('tips', $data);
	}

	public function news($date = false, $company = false)
	{
		$selected_company = $company;
		// dump($date);
		if(!$date && !$company){
			$date = Carbon::now()->toDateString();
		}
		if($date){
			try {
				$date = Carbon::parse($date, 'Asia/Karachi')->isoFormat('YYYY-MM-DD');
			} catch (Exception $e) {
				$date = Carbon::now()->toDateString();
			}
		}
		if($company){
			$company = Company::find($company);
			// dd($company);
			// $company = count($company) ?? false;
		}
		// dd($date, Carbon::parse($date, 'Asia/Karachi')->isoFormat('DD/MM/YYYY'), Carbon::now()->toDateString(), Carbon::parse($date, 'Asia/Karachi')->isoFormat('DD/MM/YYYY'));
		$user = Auth::user();
		$data = [];
		$news = News::with('news_category')->orderBy('created_at', 'DESC');
		if($date){
			$news->whereDate('created_at', $date);
		}
		if($company){
			$company_code = $company->company_code;
			$company_name = $company->name;
			$news->whereRaw("name like '%{$company_code}%' OR name like '%{$company_name}%'");
		}
		$latest_news = News::with('news_category')->orderBy('created_at', 'DESC')->limit('10')->get();
		$companies = Company::all();
		// dd($news->toArray());
		$data['news'] = $news->get();
		$data['latest_news'] = $latest_news;
		$data['companies'] = $companies;
		$data['user'] = $user;
		if(!$date){
			$date = Carbon::now()->toDateString();
		}
		$data['date'] = $date;
		$data['selected_company'] = $selected_company;
		return view('news', $data);
	}

	function validateDate($date, $format = 'Y-m-d')
	{
		$d = \DateTime::createFromFormat($format, $date);
		return $d && $d->format($format) == $date;
	}

	public function contactUs(Request $request)
	{
		$this->validate($request, [
			'sender_name' => 'required|string|max:255',
			'sender_subject' => 'required|string|max:255',
			'sender_email' => 'required|email',
			'sender_message' => 'required|string'
		]);
		$data = $request->only('sender_name', 'sender_subject', 'sender_email', 'sender_message');
		$params = [
			'name' => $data['sender_name'],
			'subject' => $data['sender_subject'],
			'email' => $data['sender_email'],
			'message' => $data['sender_message'],
		];
		$obj = ContactUs::create($params);

		Mail::send('layouts.mails.contactus',
			array(
				'name' => $params['name'],
				'email' => $params['email'],
				'user_message' => $params['message']
			), function($message) use ( $params )
			{
				$message->from('info@quorex.pk');
				$message->to('query@quorex.pk', 'Admin')->subject($params['subject']);
			});

		toastr()->success('Thanks for contacting us. We will get back to you soon.');
		return back();
	}

	public function disclaimer()
	{
		$defaults = Defaults::all();
		$data['disclaimer'] = $defaults->where('key', 'disclaimer')->pluck('value')->first();
		return view('disclaimer', $data);
	}

	public function aboutUs()
	{
		$defaults = Defaults::all();
		$data['aboutUs'] = $defaults->where('key', 'aboutUs')->pluck('value')->first();
		$data['home_mission'] = $defaults->where('key', 'home_mission')->pluck('value')->first();
		$data['home_vision'] = $defaults->where('key', 'home_vision')->pluck('value')->first();
		// dd($data);
		return view('aboutUs', $data);
	}

	public function contact_us()
	{
		// dd($data);
		return view('contactUs');
	}

	public function whyUs()
	{
		$defaults = Defaults::all();
		$data['whyUs'] = $defaults->where('key', 'whyUs')->pluck('value')->first();
		return view('whyUs', $data);
	}

	public function ourOfferings()
	{
		$defaults = Defaults::all();
		$data['ourOfferings'] = $defaults->where('key', 'ourOfferings')->pluck('value')->first();
		return view('ourOfferings', $data);
	}

	public function commonMistakes()
	{
		$defaults = Defaults::all();
		$data['commonMistakes'] = $defaults->where('key', 'commonMistakes')->pluck('value')->first();
		return view('commonMistakes', $data);
	}

	public function privacyPolicy()
	{
		$defaults = Defaults::all();
		$data['privacyPolicy'] = $defaults->where('key', 'privacyPolicy')->pluck('value')->first();
		return view('privacypolicy', $data);
	}

	public function updateChecker()
	{
		$defaults = Defaults::whereIn('key', ['updated_news', 'updated_tips'])->get();
		// return response()->json($defaults);
		$updated_news = $defaults->where('key', 'updated_news')->pluck('value')->first();
		$updated_tips = $defaults->where('key', 'updated_tips')->pluck('value')->first();
		$res = false;
		if($updated_news || $updated_tips){
			if($updated_news){
				toastr()->info('New Alert has been added. <a href="news" class="font-weight-bold">To view click here</a>');
			}
			if($updated_tips){
				toastr()->info('New Trading Signal has been added. <a href="tips" class="font-weight-bold">To view click here</a>');
			}
			$params = [
				'value' => 0
			];
			Defaults::whereIn('key', ['updated_news', 'updated_tips'])->update($params);
			$res = true;
		}
		return response()->json($res);
	}
}
