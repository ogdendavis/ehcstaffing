<?php
/*
 * Create endpoint to upload submitted applications
 * TODO: Secure the darn form!
 */

if (!function_exists('ehc_get_homepage_content')) {
    function ehc_get_homepage_content()
    {
        // Get body content of homepage
        $h_page = get_page_by_path('home');
        $h_content = $h_page->post_content;
        $h_id = $h_page->ID;

        // Get meta, remove 'hidden' meta (leading underscore in key)
        $h_meta = get_post_meta($h_id);
        $filtered_meta = array_filter(
            $h_meta,
            function ($k) {
                return $k[0] !== '_';
            },
            ARRAY_FILTER_USE_KEY
        );

        // Pull meta values out of their containing arrays
        foreach ($filtered_meta as $key => $val) {
            $filtered_meta[$key] = array_pop($val);
        }

        // Add page content and return
        $filtered_meta['page_body'] = $h_content;
        return $filtered_meta;
    }
    add_action('rest_api_init', function () {
        register_rest_route('ehcapi/v1', '/homepage', [
            'methods' => 'GET',
            'callback' => 'ehc_get_homepage_content',
        ]);
    });
}
