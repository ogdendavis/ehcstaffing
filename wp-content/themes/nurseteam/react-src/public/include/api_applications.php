<?php
/*
 * Create endpoint to upload submitted applications
 * TODO: Secure the darn form!
 */

if (!function_exists('ehc_create_application')) {
    function ehc_create_application()
    {
        return 'success';
    }
    add_action('rest_api_init', function () {
        register_rest_route('ehcapi/v1', '/createapplication', [
            'methods' => 'GET',
            'callback' => 'ehc_create_application',
        ]);
    });
}
