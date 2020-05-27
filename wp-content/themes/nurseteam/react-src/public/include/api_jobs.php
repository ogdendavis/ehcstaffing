<?php
/*
 * Create REST API endpoint to retrieve all job info
 * TODO: Implement paging
 * TODO: API endpoint for one job (or do I handle in React?)
 */

// API endpoint for all jobs
if (!function_exists('ehc_get_jobs')) {
    // Get info for all jobs
    function ehc_get_jobs()
    {
        // Get all the jobs
        $jobs = get_posts([
            'post_type' => 'ehc_job',
            'numberposts' => -1,
        ]);
        // Use helper function to get the meta, and push it to the API
        return array_map('ehc_get_job_meta', $jobs);
    }
    function ehc_get_job_meta($job_post)
    {
        // Get meta and filter out any that aren't our custom fields
        $raw = get_post_meta($job_post->ID);
        $filtered = array_filter(
            $raw,
            function ($k) {
                return strpos($k, 'job_') !== false;
            },
            ARRAY_FILTER_USE_KEY
        );
        // No need to expose source id to the front end
        unset($filtered['_job_sourceid']);
        // Simplify by making keys plain English and bringing the info up out
        // of the array it's currently hiding in
        $simplified = [];
        foreach ($filtered as $k => $v) {
            $newkey = str_replace('_job_', '', $k);
            $simplified[$newkey] = $v[0];
        }
        return $simplified;
    }
    // Add endpoint
    add_action('rest_api_init', function () {
        register_rest_route('ehcapi/v1', '/jobs', [
            'methods' => 'GET',
            'callback' => 'ehc_get_jobs',
        ]);
    });
}
