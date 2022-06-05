<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'register', 'login', 'logout', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'Access-Control-Allow-Origin' => ['http://localhost:3000'],

    'allowed_origins_patterns' => ['GET', 'POST', 'PUT', 'DELETE'],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['DAV', 'content-length', 'Allow'],

    'max_age' => 86400,

    'supports_credentials' => true,

    'hosts' => []

];
