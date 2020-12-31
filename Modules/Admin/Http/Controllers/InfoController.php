<?php

namespace Modules\Admin\Http\Controllers;

use App\Models\Defaults;
use App\Models\News;
use App\Models\NewsCategory;
use App\Notifications;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class InfoController extends Controller
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
        $kb = News::with('news_category')->get();
        $data['news'] = $kb;
        return view('admin::knowledge_center', $data);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        $ret = $this->edit(0);
        return response()->json($ret);
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
        $news = News::with('news_category')->where('news_id', $id)->first();
        $news_categories = NewsCategory::all();
        $ret = [
            'news' => $news,
            'news_categories' => $news_categories,
        ];
        return $ret;
    }
    public function editKb(Request $request)
    {
        $news_id = $request->get('news_id');
        $ret = $this->edit($news_id);
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
        $req = $request->only('news_id', 'news_title', 'news_name', 'news_categories');
        $rules_edit = [
            'news_id' => 'required|int',
            'news_title' => 'required|string',
            'news_name' => 'required|string',
            'news_categories' => 'required|int',
        ];
        $rules_add = [
            'news_title' => 'required|string',
            'news_name' => 'required|string',
            'news_categories' => 'required|int',
        ];
        if(!$req['news_id']){
            try {
                $validate = $request->validate($rules_add);
                $params = [
                    'title' => $req['news_title'],
                    'name' => $req['news_name'],
                    'news_category_id' => $req['news_categories'],
                ];
                $ret = News::create($params);
                $def_params = [
                    'value' => 1
                ];
                Defaults::where('key', 'updated_news')->update($def_params);
                $notif_params = [
                    "to" => getUsersFCMs()[0],
                    "body" => $params['name'],
                    "title" => $params['title'],
                    "click_action" => 'http://127.0.0.1:8000/news',
                    "icon" => asset('assets/img/favicon.png')
                ];
                // dd($notif_params);
                $notif = new Notifications($notif_params);
                $notif_res = $notif->send();
                // dd($notif_res);
                flash('News Created. ID: ' . $ret->news_id)->success()->important();
            } catch (\Exception $e) {
                $ret = $e->getMessage();
                flash('News Not Updated' . $ret)->error()->important();
            }
            return redirect(route('admin.kb'));
        }
        // dd($req);
        try {
            $validate = $request->validate($rules_edit);
            // dd($validate);
            $params = [
                'title' => $req['news_title'],
                'name' => $req['news_name'],
                'news_category_id' => $req['news_categories'],
            ];
            // dd($params);
            $ret = News::find($req['news_id'])->update($params);
            flash('News Updated')->success()->important();
        } catch (\Exception $e) {
            $ret = $e->getMessage();
            flash('News Not Updated')->error()->important();
        }
        // dd($ret);
        return redirect(route('admin.kb'));
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    private function destroy($id)
    {
        try {
            $ret = News::find($id)->delete();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function deactivateKb(Request $request)
    {
        $kb_id = $request->get('kb_id');
        $ret = $this->destroy($kb_id);
        return response()->json($ret);
    }

    private function restore($id)
    {
        try {
            $ret = News::withTrashed()->find($id)->restore();
        } catch (\Exception $e) {
            $ret = false;
        }
        return $ret;
    }

    public function reactivateKb(Request $request)
    {
        $kb_id = $request->get('kb_id');
        $ret = $this->restore($kb_id);
        return response()->json($ret);
    }
}
