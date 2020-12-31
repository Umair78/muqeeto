<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyCategory;
use App\Models\CompanyTip;
use App\Models\Sector;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $data = [];
        $user = checkAdminAuth();
        // dd($user->toArray());
        if($user == 'NoAdmin'){
            return redirect('/');
        }
        if(!$user){
            return redirect(route('admin.login'));
        }

        // \DB::enableQueryLog();
        $companies = Company::with('sector', 'company_category')->withTrashed()->get();
        $company_tips = CompanyTip::orderBy('company_id', 'DESC')->orderBy('created_at', 'DESC')->get();
        // dd(\DB::getQueryLog());
        // dd($companies->toArray());
        // dd(Carbon::today());
        // dd($company_tips->toArray());
        $data['companies'] = $companies;
        $data['company_tips'] = $company_tips;
        // dd($company_tips->where('company_id', 2)->isEmpty());

        return view('admin::companies', $data);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('admin::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        return view('admin::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    private function edit($id)
    {
        $company = Company::with('sector', 'company_category')->where('company_id', $id)->first();
        $sectors = Sector::all();
        $company_categories = CompanyCategory::all();
        $ret = [
            'company' => $company,
            'sectors' => $sectors,
            'company_categories' => $company_categories,
        ];
        return $ret;
    }
    public function editCompany(Request $request)
    {
        // return response()->json($request->all());
        $company_id = $request->get('company_id');
        $ret = $this->edit($company_id);
        return response()->json($ret);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request)
    {
        $req = $request->all();
        $rules = [
            'company_id' => 'required|int',
            'company_name' => 'required|string',
            'company_categories' => 'required|int',
            'sectors' => 'required|int',
            'company_code' => 'required|string'
        ];
        // dd($req);
        try {
            $validate = $request->validate($rules);
            // dd($validate);
            $params = [
                'company_code' => $req['company_code'],
                'name' => $req['company_name'],
                'company_category_id' => $req['company_categories'],
                'sector_id' => $req['sectors'],
            ];
            // dd($params);
            $ret = Company::find($req['company_id'])->update($params);
            flash('Company Updated')->success()->important();
        } catch (\Exception $e) {
            $ret = $e->getMessage();
            flash('Company Not Updated')->error()->important();
        }
        // dd($ret);
        return redirect(route('admin.companies'));
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    private function destroy($id)
    {
        try {
            $ret = Company::find($id)->delete();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function deactivateCompany(Request $request)
    {
        $company_id = $request->get('company_id');
        $ret = $this->destroy($company_id);
        return response()->json($ret);
    }

    private function restore($id)
    {
        try {
            $ret = Company::withTrashed()->find($id)->restore();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function reactivateCompany(Request $request)
    {
        $company_id = $request->get('company_id');
        $ret = $this->restore($company_id);
        return response()->json($ret);
    }
}
