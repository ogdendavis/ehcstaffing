<?php
/*
 * Create REST API endpoint to retrieve all job info
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
        // Simplify by making keys plain English and bringing the info up out
        // of the array it's currently hiding in
        foreach ($filtered as $k => $v) {
            $newkey = str_replace('_job_', '', $k);
            $simplified[$newkey] = $v[0];
        }
        // Add title for consistent display in job listings and submission form
        $simplified['display_title'] =
            $simplified['specialty'] .
            ' in ' .
            $simplified['city'] .
            ', ' .
            $simplified['state'];
        // Add local id to simplify fetching job data from associated applications
        $simplified['localid'] = $job_post->ID;
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
