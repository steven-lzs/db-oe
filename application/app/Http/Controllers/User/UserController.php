<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function sayHi() {
        $result = DB::table('test')->first();
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }
}
