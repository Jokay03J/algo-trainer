<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function registerTeacher(RegisterRequest $request)
    {
        // Create an user with teacher type
        $createdTeacher = User::create([
            ...$request->all(),
            "type" => "teacher",
        ]);

        $token = $createdTeacher->createToken(time());

        return ["token" => $token->plainTextToken];
    }

    public function login(LoginRequest $request)
    {
        // Get user by its email
        $foundedUser = User::where(
            "email",
            "=",
            $request->input("email")
        )->first();

        // Check if user is found and hashed password is the same between provided password
        if (
            $foundedUser &&
            Hash::check($request->input("password"), $foundedUser->password)
        ) {
            // Create token from founded user
            $token = $foundedUser->createToken(time());

            return ["token" => $token->plainTextToken];
        }

        // Otherwise return an 404
        return response(["message" => "User not found"], 404);
    }
}
