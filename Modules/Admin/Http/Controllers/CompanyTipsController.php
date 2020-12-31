<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyTip;
use App\Models\Defaults;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CompanyTipsController extends Controller
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

        $company_tips = CompanyTip::with('company')->orderBy('company_id', 'DESC')->withTrashed()->get();
        // dd($company_tips->toArray());
        $data['company_tips'] = $company_tips;
        // dd($company_tips->where('company_id', 2)->isEmpty());

        return view('admin::companyTips', $data);
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
        $req = $request->only('tip_text', 'tip_details', 'other_details', 'co_position', 'company_id');
        // return response()->json($req);
        $rules = [
            'company_id' => 'required',
            'tip_text' => 'required',
            'tip_details' => 'required',
            'other_details' => 'required',
            'co_position' => 'required'
        ];
        try {
            $validate = $request->validate($rules);
            $tip_details = cleanJson_forSave(json_encode($req['tip_details']));
            $user = session('admin');
            $params = [
                'company_id' => $req['company_id'],
                'tips' => $req['tip_text'],
                'tip_details' => $tip_details,
                'company_tips_meta' => $req['other_details'],
                'position' => $req['co_position'],
                'created_by' => $user->user_id,
            ];
            $ret = CompanyTip::create($params);
            $ret->tip_details = cleanJson_forShow($ret->tip_details);
            $paramsDefaults = [
                'value' => 1
            ];
            Defaults::where('key', 'updated_tips')->update($paramsDefaults);
        } catch (\Exception $e) {
            $ret = $e->getMessage();
        }
        return response()->json($ret);
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
    public function edit($id)
    {
        $user = Auth::user();
        if($user){
            $tip = CompanyTip::find($id);
            if($tip){
                $tip->tip_details = json_decode($tip->tip_details, true);
                $res = [
                    'code' => 200,
                    'message' => 'Data Found',
                    'data' => $tip
                ];
                return response()->json($res);
            } else{
                $res = [
                    'code' => 409,
                    'message' => 'Data Not Found',
                    'data' => []
                ];
                return response()->json($res);
            }
            return response()->json($tip);
        } else{
            $res = [
                'code' => 401,
                'message' => 'Unauthorized'
            ];
            return response()->json($res);
        }
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request)
    {
        $req = $request->only('tip_text', 'tip_details', 'other_details', 'co_position', 'company_id', 'company_tip_id');
        // return response()->json($req);
        $rules = [
            'company_tip_id' => 'required',
            'company_id' => 'required',
            'tip_text' => 'required',
            'tip_details' => 'required',
            'other_details' => 'required',
            'co_position' => 'required'
        ];
        try {
            $validate = $request->validate($rules);
            $company_tip_id = $req['company_tip_id'];
            $tip_details = cleanJson_forSave(json_encode($req['tip_details']));
            $user = session('admin');
            $params = [
                'company_id' => $req['company_id'],
                'tips' => $req['tip_text'],
                'tip_details' => $tip_details,
                'company_tips_meta' => $req['other_details'],
                'position' => $req['co_position'],
                'created_by' => $user->user_id,
            ];
            $ret = CompanyTip::where('company_tip_id', $company_tip_id)->update($params);
            $ret = CompanyTip::where('company_tip_id', $company_tip_id)->first();
            $ret->tip_details = cleanJson_forShow($ret->tip_details);
            $paramsDefaults = [
                'value' => 1
            ];
            Defaults::where('key', 'updated_tips')->update($paramsDefaults);
        } catch (\Exception $e) {
            $ret = $e->getMessage();
        }
        return response()->json($ret);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    private function destroy($id)
    {
        try {
            $ret = CompanyTip::find($id)->delete();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function removeCompanyTip(Request $request)
    {
        $company_tip_id = $request->get('company_tip_id');
        $ret = $this->destroy($company_tip_id);
        return response()->json($ret);
    }

    public function changeStatus(Request $request)
    {
        $status = $request->get('status');
        $company_tip_id = $request->get('company_tip_id');

        if($status){
            $res = CompanyTip::where('company_tip_id', $company_tip_id)->restore();
        } else{
            $res = $this->destroy($company_tip_id);
        }
        return response()->json($res);
    }

    public function changeSuccessStatus($company_tip_id, $status)
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

        try {
            CompanyTip::where('company_tip_id', $company_tip_id)->withTrashed()->update(['tip_success_status' => $status]);
            flash('Updated Successfully')->success()->important();
        } catch (\Exception $e) {
            flash('Some Error Occured. ' . $e->getMessage())->error()->important();
        }
        return redirect()->route('admin.tips');
    }
}
