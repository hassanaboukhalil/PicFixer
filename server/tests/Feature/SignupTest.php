<?php

// namespace Tests\Feature;

// use App\Models\User;
// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;
// use Tests\TestCase;

// class SignupTest extends TestCase
// {
//     use RefreshDatabase, WithFaker;

//     public function testSignup(): void
//     {
//         $name = $this->faker->name();
//         $email = $this->faker->unique()->safeEmail();

//         $user = User::factory()->create([
//             'email' => $email,
//             'password' => bcrypt('password'),
//         ]);

//         $response = $this->postJson("/api/signup", [
//             'name' => $name,
//             'email' => $email,
//             'password' => 'password',
//             'ip' => '192.168.1.1',
//             'latitude' => '33.12345',
//             'longitude' => '35.67890'
//         ]);

//         $response->assertStatus(200)
//             ->assertJson([
//                 "success" => true,
//                 "message" => "User registered successfully",
//                 "data" => [
//                     "user" => [
//                         "id" => $user->id,
//                         "email" => $email,
//                         "name" => $user->name,
//                     ]
//                 ]
//             ]);
//     }
// }
