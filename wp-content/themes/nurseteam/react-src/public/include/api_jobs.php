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

        // Because we're uploading spreadsheets, things can get weird. Insert default values into API response if values were missing from spreadsheet.
        if (!array_key_exists('sourceid', $simplified)) {
            // Generate random ID with numbers and characters, so the odds of accidentally matching an existing one are low.
            $chars = '0123456789qwertyuiopasdfghjklzxcvbnm';
            $rando_id = '';
            for ($i = 0; $i < 10; $i++) {
                $rando_id .= $chars[rand(0, 35)];
            }
            $simplified['sourceid'] = $rando_id;
        }
        if (!array_key_exists('city', $simplified)) {
            $simplified['city'] = '';
        }
        if (!array_key_exists('state', $simplified)) {
            $simplified['state'] = '';
        }
        if (!array_key_exists('startdate', $simplified)) {
            $simplified['startdate'] = '';
        }
        if (!array_key_exists('duration', $simplified)) {
            $simplified['duration'] = '';
        }
        if (!array_key_exists('specialty', $simplified)) {
            $simplified['specialty'] = '';
        }
        if (!array_key_exists('unit', $simplified)) {
            $simplified['unit'] = '';
        }
        if (!array_key_exists('shift', $simplified)) {
            $simplified['shift'] = '';
        }
        if (!array_key_exists('pay', $simplified)) {
            $simplified['pay'] = '';
        }
        if (!array_key_exists('description', $simplified)) {
            $simplified['description'] = '';
        }

        // Add title for consistent display in job listings and submission form
        $simplified['display_title'] =
            $simplified['specialty'] .
            ' in ' .
            $simplified['city'] .
            ', ' .
            $simplified['state'];
        return $simplified;
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
