<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function login(Request $request) {
        if($request->email == 'steven9364@gmail.com' && $request->password == 'steven9364'){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => []
            ]);
        }

        return response()->json([
            'status' => 500,
            'message' => 'Fail to login',
            'data' => []
        ]);
    }

    public function updateDiary(Request $request) {
        $result = DB::table('diary')->insert([
            'date' => $request->date,
            'content' => $request->content,
            'created_on' => date('Y-m-d'),
            'modified_on' => date('Y-m-d')
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }

    public function getDiary() {
        $result = DB::select('select * from diary');
        // $result = '555';
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }
}
