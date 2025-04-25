<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
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
            'name' => 'required|min:3',
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
            'name.required' => 'Name is required',
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required',
            'ip.required' => 'Something went wrong, try again later',
            'latitude.required' => 'Something went wrong, try again later',
            'longitude.required' => 'Something went wrong, try again later',
        ];
    }
}
