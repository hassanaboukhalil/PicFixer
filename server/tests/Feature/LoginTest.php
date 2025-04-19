<?php

namespace Tests\Feature;

use App\Models\LoginActivity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testLogin(): void
    {
        $email = $this->faker->unique()->safeEmail();

        $user = User::factory()->create([
            'email' => $email,
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson("/api/login", [
            'email' => $email,
            'password' => 'password',
            'ip' => '192.168.0.1',
            'latitude' => '33.33333',
            'longitude' => '35.44444'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                "success" => true,
                "message" => "User logged in successfully",
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $email,
                ]
            ]);
    }
}
