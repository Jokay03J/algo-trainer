<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Student\AttachStudentRequest;
use App\Http\Requests\Student\StudentRegisterRequest;
use App\Models\AssociatedStudent;
use App\Models\Auth\TeacherRegisterCode;
use App\Models\StudentAttachCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function registerTeacher(RegisterRequest $request): array|Response
    {
        // Get register code by its code
        $foundedCode = TeacherRegisterCode::where(
            "code",
            "=",
            $request->input("code")
        )->first();
        // Check if register exist
        if (!$foundedCode) {
            return response("Invalid code", 403);
        }
        // Create an user with teacher type
        $createdTeacher = User::create([
            ...$request->all(),
            "type" => "teacher",
        ]);

        $token = $createdTeacher->createToken(time());

        return ["token" => $token->plainTextToken, "id" => $createdTeacher->id];
    }

    public function registerStudent(StudentRegisterRequest $request): array
    {
        // Create student
        $createdStudent = User::create([
            ...$request->all(),
            "type" => "student",
        ]);
        // Create token
        $token = $createdStudent->createToken(time());
        // Return its token
        return ["token" => $token->plainTextToken, "id" => $createdStudent->id];
    }

    public function createStudentCode(Request $request): array
    {
        // Restrict student creation code to teacher only
        if ($request->user()->type === "student") {
            return response(["message" => "Invalid type account", 403]);
        }
        // Create a student code
        $createdStudentAttachCode = StudentAttachCode::create([
            "user_id" => $request->user()->id,
            "code" => Str::uuid(),
        ]);
        // Return attach code
        return ["code" => $createdStudentAttachCode->code];
    }

    public function login(LoginRequest $request): array|Response
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

            return [
                "token" => $token->plainTextToken,
                "id" => $foundedUser->id,
            ];
        }

        // Otherwise return an 404
        return response(["message" => "User not found"], 404);
    }

    public function attachStudent(AttachStudentRequest $request): Response
    {
        // Get attach student code(previously check if code exist in db)
        $attachCode = StudentAttachCode::where(
            "code",
            "=",
            $request->input("code")
        )->first();
        // Get old associated student
        $oldAssociatedStudent = AssociatedStudent::where([
            ["student_id", "=", $request->user()->id],
            ["teacher_id", "=", $attachCode->user_id],
        ])->first();
        // Check if student has already associated teacher
        if ($oldAssociatedStudent) {
            return response(
                ["message" => "Student already associated to this teacher"],
                419
            );
        }
        // Create association between student and teacher
        AssociatedStudent::create([
            "student_id" => $request->user()->id,
            "teacher_id" => $attachCode->user_id,
        ]);
        return response([
            "message" =>
                "Student " . $request->user()->id . " is now associated.",
        ]);
    }
}
