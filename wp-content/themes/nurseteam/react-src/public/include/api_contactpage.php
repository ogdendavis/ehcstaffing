<?php
/*
 * Create endpoint to return contact page content
 */

if (!function_exists('ehc_get_contactpage_content')) {
    function ehc_get_contactpage_content()
    {
        // Get body content and ID of contact page
        $c_page = get_page_by_path('get-in-touch-page');

        $c_content = $c_page->post_content;
        $c_id = $c_page->ID;

        // Get meta, remove 'hidden' meta (leading underscore in key)
        $c_meta = get_post_meta($c_id);
        $filtered_meta = array_filter(
            $c_meta,
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
        $filtered_meta['page_body'] = $c_content;
        return $filtered_meta;
    }
    add_action('rest_api_init', function () {
        register_rest_route('ehcapi/v1', '/contactpage', [
            'methods' => 'GET',
            'callback' => 'ehc_get_contactpage_content',
        ]);
    });
}
