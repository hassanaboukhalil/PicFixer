<?php

namespace App\Services;

use App\Models\User;
use App\Events\UserLoggedIn;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;

class AuthService
{
    use ResponseTrait;

    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return $this->errorResponse('Wrong email or password', 401);
        }

        UserLoggedIn::dispatch(
            $user,
            $data['ip'],
            $data['latitude'],
            $data['longitude']
        );

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
            ]
        ], 'User logged in successfully');
    }

    public function signup(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        UserLoggedIn::dispatch(
            $user,
            $data['ip'],
            $data['latitude'],
            $data['longitude']
        );

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
            ]
        ], 'User registered successfully');
    }
}
