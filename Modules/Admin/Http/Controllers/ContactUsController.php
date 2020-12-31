<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ContactUsController extends Controller
{
    static function admin()
    {
        $user = checkAdminAuth();
        // dd($user->toArray());
        if($user == 'NoAdmin'){
            return redirect('/');
        }
        if(!$user){
            return redirect(route('admin.login'));
        }
        return $user;
    }
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $data = [];
        $msgs = ContactUs::withTrashed()->get();
        $data['msgs'] = $msgs;
        return view('admin::user_messages', $data);
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
    public function edit($id)
    {
        return view('admin::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    private function destroy($id)
    {
        try {
            $ret = ContactUs::find($id)->delete();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function deactivateMsg(Request $request)
    {
        $msg_id = $request->get('msg_id');
        $ret = $this->destroy($msg_id);
        return response()->json($ret);
    }

    private function restore($id)
    {
        try {
            $ret = ContactUs::withTrashed()->find($id)->restore();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function reactivateMsg(Request $request)
    {
        $msg_id = $request->get('msg_id');
        $ret = $this->restore($msg_id);
        return response()->json($ret);
    }
}
