<?php
/*
 * Modify what non-admin users (i.e. everybody but ech_admin) sees on the admin
 * dashboard when logged in to the back end
 */

/*
 * Remove existing dashboard widgets
 */
if (!function_exists('ehc_remove_dashboard_widgets')) {
    function ehc_remove_dashboard_widgets()
    {
        if (!current_user_can('manage_options')) {
            // These should be all the standard widgets
            remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
            remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
            remove_meta_box('dashboard_primary', 'dashboard', 'normal');
            remove_meta_box('dashboard_secondary', 'dashboard', 'normal');
            // Leaving in quick draft, at least for now
            // remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
            remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');
            remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
            remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
            remove_meta_box('dashboard_activity', 'dashboard', 'normal');
        }
    }
    add_action('admin_init', 'ehc_remove_dashboard_widgets');
}

/*
 * Modify the quick draft widget
 */

/*
 * Now we can add our own widgets!
 */
if (!function_exists('ehc_add_dashboard_widgets')) {
    // Register our new widgets
    function ehc_add_dashboard_widgets()
    {
        wp_add_dashboard_widget(
            'ehc_add_job_widget',
            'Add a Job',
            'ehc_build_add_job_widget'
        );
        wp_add_dashboard_widget(
            'ehc_delete_job_widget',
            'Delete Jobs',
            'ehc_build_delete_job_widget'
        );
    }
    add_action('wp_dashboard_setup', 'ehc_add_dashboard_widgets');

    // Helper functions to echo the markup for the new widgets
    function ehc_build_add_job_widget()
    {
        echo 'Widget to add a new job!';
    }
    function ehc_build_delete_job_widget()
    {
        echo 'Widget to select and delete multiple jobs!';
    }
}
