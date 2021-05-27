<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['msg' => 'incorrect']);
        }
    
        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $token
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => []
        ]);
    }

    // public function register(Request $request){
    //     $request->validate([
    //         'name'                  => ['required'],
    //         'email'                 => ['required', 'email', 'unique:users'],
    //         'password'              => ['required', 'min:6', 'confirmed'],
    //         'password_confirmation' => ['required'],
    //     ]);

    //     User::create([
    //         'name'          => $request->name,
    //         'email'         => $request->email,
    //         'password'      => Hash::make($request->password),
    //     ]);

    //     return response()->json(['msg' => 'Registered Successfully']);
    // }

}
