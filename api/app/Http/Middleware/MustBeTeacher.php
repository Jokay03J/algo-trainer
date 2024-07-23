<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MustBeTeacher
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is connected and user type is a teacher
        if ($request->user() && $request->user()->type === "teacher") {
            return $next($request);
        }
        // Otherwise return an forbidden response
        return response(["message" => "You must be a teacher"], 403);
    }
}
