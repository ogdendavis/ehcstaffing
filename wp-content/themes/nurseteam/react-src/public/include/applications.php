<?php

/*
 * Create custom post type for submitted applications to be saved in database.
 * This file will define the post type and back-end interface for editing.
 * Creation of an application post when a client submits an application via
 * the form on the website is handled in forms.php
 */

/*
 * Create the post type
 */
if (!function_exists('ehc_custom_post_apps')) {
    function ehc_custom_post_apps()
    {
        register_post_type('ehc_application', [
            'labels' => [
                'name' => 'Applications',
                'singular_name' => 'Application',
            ],
            'public' => false,
            // show_ui allows us to interact with the posts in admin, even though they're not public
            'show_ui' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-text-page',
            'supports' => [''],
            'rewrite' => ['slug' => 'applications'],
        ]);
    }
    add_action('init', 'ehc_custom_post_apps');
}

/*
 * Create back-end edit application display
 */
if (!function_exists('ehc_add_app_meta')) {
    // Register meta box for edit post page
    function ehc_add_app_meta()
    {
        add_meta_box(
            'ehc_app_info',
            'Application Info',
            'build_ehc_app_info',
            'ehc_application',
            'normal',
            'high'
        );
    }
    add_action('add_meta_boxes_ehc_application', 'ehc_add_app_meta');

    // Markup for the meta box
    function build_ehc_app_info($post)
    {
        var_dump(get_post_meta($post->ID));
    }
}

/*
 * Remove back-end buttons to make new applications -- all should be
 * user-submitted
 */
if (!function_exists('ehc_hide_add_app_buttons')) {
    function ehc_hide_add_app_buttons()
    {
        $user = wp_get_current_user();
        $role = $user->roles[0];
        // if ($role === 'administrator') {
        //     return;
        // }
        // Remove from admin sidebar
        global $submenu;
        unset($submenu['edit.php?post_type=ehc_application'][10]);
        // Remove from applications listing page
        if (
            isset($_GET['post_type']) &&
            $_GET['post_type'] === 'ehc_application'
        ) {
            echo '<style>.page-title-action{display:none;visibility:hidden;}</style>';
        }
        // Remove from application edit page
        if (isset($_GET['post'])) {
            $post_id = absint($_GET['post']);
            $post_type = get_post_type($post_id);
            if ($post_type === 'ehc_application') {
                echo '<style>.page-title-action{display:none;visibility:hidden;}</style>';
            }
        }
    }
    add_action('admin_init', 'ehc_hide_add_app_buttons');
}

/*
 * Handle front-end job application form submission
 */
if (!function_exists('ehc_submit_application_form')) {
    function ehc_submit_application_form()
    {
        // TODO: VALIDATE!
        // Args for wp_insert_post
        $args = [
            'ID' => 0,
            'post_type' => 'ehc_application',
            'post_status' => 'publish',
            'meta_input' => [
                '_app_firstname' => sanitize_text_field($_REQUEST['firstname']),
                '_app_lastname' => sanitize_text_field($_REQUEST['lastname']),
                '_app_email' => sanitize_email($_REQUEST['email']),
                '_app_phone' => sanitize_text_field($_REQUEST['phone']),
                '_app_job_sourceid' => sanitize_text_field(
                    $_REQUEST['whichJob']
                ),
                '_app_job_localid' => sanitize_text_field($_REQUEST['localid']),
                '_app_resume' => $_REQUEST['resume'],
                '_app_coverletter' => $_REQUEST['coverletter'],
            ],
        ];
        wp_insert_post($args);
        // Temp reload redirect -- update to success message
        wp_redirect($_SERVER['HTTP_REFERER']);
        die();
    }
    add_action('admin_post_submit_jobapp', 'ehc_submit_application_form');
}

/*
 * Modify back-end display on applications list page
 */
if (!function_exists('ehc_add_application_columns')) {
    // First function defines the columns visible on the list page
    function ehc_add_application_columns()
    {
        return [
            'cb' => __('<input type="checkbox" />'),
            'name' => __('Applicant Name'),
            'job' => __('Job Title'),
            'sourceid' => __('Job Source ID'),
        ];
    }
    add_filter(
        'manage_ehc_application_posts_columns',
        'ehc_add_application_columns'
    );

    // Next function populates the columns defined above with data for each application
    function ehc_fill_application_columns($column, $post_id)
    {
        // Full name for display
        $full_name =
            get_post_meta($post_id, '_app_firstname', true) .
            ' ' .
            get_post_meta($post_id, '_app_lastname', true);
        // Recreate display_title from API using job meta
        $job_id = get_post_meta($post_id, '_app_job_localid', true);
        $job_title =
            get_post_meta($job_id, '_job_specialty', true) .
            ' in ' .
            get_post_meta($job_id, '_job_city', true) .
            ', ' .
            get_post_meta($job_id, '_job_state', true);
        // Echo the output based on column
        if ($column === 'sourceid') {
            echo get_post_meta($post_id, '_app_job_sourceid', true);
        } elseif ($column === 'name') {
            echo $full_name;
        } elseif ($column === 'job') {
            echo $job_title;
        }
    }
    add_action(
        'manage_ehc_application_posts_custom_column',
        'ehc_fill_application_columns',
        10,
        2
    );
}
