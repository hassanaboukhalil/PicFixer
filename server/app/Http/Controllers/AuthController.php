<?php

namespace App\Http\Controllers;

use App\Events\UserLoggedIn;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function login(Request $request)
    {
        try {
            $email = $request->email;
            $password = $request->password;
            $ip = $request->ip;
            $lat = $request->latitude;
            $lon = $request->longitude;

            if (!$email || !$password) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email and password are required'
                ], 500);
            }

            $user = User::where('email', $email)->first();
            // $user_password = User::where($user_email);

            if (!$user || !Hash::check($password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Wrong email or password'
                ], 401);
            }

            UserLoggedIn::dispatch($user, $ip, $lat, $lon);

            return response()->json([
                'success' => true,
                // 'user' => $user,
                'message' => 'User logged in successfully',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
