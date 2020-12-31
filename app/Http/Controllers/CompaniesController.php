<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;


/**
 * Class CompaniesController
 * @package App\Http\Controllers
 */
class CompaniesController extends Controller
{
    public function __construct()
    {
    }

    public function index()
    {
        $user = Auth::user();
//        dd($user);
        $data = [];
        $companies = Company::all();
        $data['companies'] = $companies;
        $data['user'] = $user;
        return view('company', $data);
    }
}
