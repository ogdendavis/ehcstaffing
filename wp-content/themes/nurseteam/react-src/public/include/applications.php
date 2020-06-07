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
                '_app_firstname' => $_REQUEST['firstname'][0],
                '_app_lastname' => $_REQUEST['lastname'][0],
                '_app_email' => $_REQUEST['email'][0],
                '_app_phone' => $_REQUEST['phone'][0],
                '_app_job_sourceid' => $_REQUEST['whichJob'][0],
                '_app_resume' => $_REQUEST['resume'][0],
                '_app_coverletter' => $_REQUEST['coverletter'][0],
            ],
        ];
        wp_insert_post($args);
        // Temp reload redirect -- update to success message
        wp_redirect($_SERVER['HTTP_REFERER']);
        die();
    }
    add_action('admin_post_submit_jobapp', 'ehc_submit_application_form');
}
