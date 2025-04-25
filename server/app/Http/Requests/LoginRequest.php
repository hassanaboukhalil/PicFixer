<?php

namespace App\Http\Requests;

use App\Traits\ResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    use ResponseTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:8',
            'ip' => 'required',
            'latitude' => 'required',
            'longitude' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required',
            'ip.required' => 'Something went wrong, try again later',
            'latitude.required' => 'Something went wrong, try again later',
            'longitude.required' => 'Something went wrong, try again later',
        ];
    }
}
