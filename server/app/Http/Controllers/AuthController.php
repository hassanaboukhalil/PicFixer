<?php

namespace App\Http\Controllers;

use App\Events\UserLoggedIn;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use App\Services\AuthService;

class AuthController extends Controller
{
    function login(LoginRequest $request)
    {
        try {
            $authService = new AuthService();
            return $authService->login($request->only([
                'email',
                'password',
                'ip',
                'latitude',
                'longitude'
            ]));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    function signup(SignupRequest $request)
    {
        try {
            $authService = new AuthService();
            return $authService->signup($request->only([
                'name',
                'email',
                'password',
                'ip',
                'latitude',
                'longitude'
            ]));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
