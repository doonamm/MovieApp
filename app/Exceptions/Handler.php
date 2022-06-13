<?php

namespace App\Exceptions;

use App\Enums\Status;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Response;
use Throwable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (TokenInvalidException $e, $request) {
            return Response::json([
                'success' => false,
                'type' => 'invalid',
                'message' => 'Invalid token'
            ], 200);
        });

        $this->renderable(function (TokenExpiredException $e, $request) {
            return Response::json([
                'success' => false,
                'type' => 'expired',
                'message' => 'Token expired'
            ], 200);
        });

        $this->renderable(function (JWTException $e, $request) {
            return Response::json([
                'success' => false,
                'type' => 'unauthorized',
                'message' => 'Token not parsed'
            ], 200);
        });
    }

    public function render($request, Throwable $e)
    {
        $errorMsg = '';

        switch (true) {
                //skip if exception is belong JWT
            case $e instanceof JWTException:
                break;
            case $e instanceof ModelNotFoundException:
                $errorMsg = 'Model not found';
                break;
                //catch policy exception
            case $e instanceof AuthorizationException:
                $errorMsg = 'User is not allowed';
                break;
            case $e instanceof QueryException:
                $errorMsg = 'Query fail';
                break;
                //------------modify here 


            //------------end modify
            case $e instanceof Exception:
                $errorMsg = 'Something went wrong';
                break;
        }

        if (strlen($errorMsg) > 0) {
            return response()->json([
                'success' => false,
                'message' => $errorMsg,
                'error' => $e
            ]);
        }

        return parent::render($request, $e);
    }
}
