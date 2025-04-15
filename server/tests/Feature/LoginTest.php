<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function testLogin(): void
    {
        // $response = $this->get('/');

        // $response->assertStatus(200);

        $email = $this->faker->unique()->safeEmail();

        $user = User::factory()->create([
            'email' => $email,
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson("/api/login", [
            'email' => $email,
            'password' => 'password',
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
