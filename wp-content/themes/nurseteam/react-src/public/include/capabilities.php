<?php
/*
 * Remove ability for anyone other than administrators to make new pages
 */

if (!function_exists('ehc_remove_capabilities')) {
    function ehc_remove_capabilities()
    {
        // Remove the actual capabilities
        // Probably redunant with below, but better safe than sorry
        $editor = get_role('editor');
        $editor->remove_cap('publish_pages');
        $editor->remove_cap('delete_published_pages');
    }
    add_action('init', 'ehc_remove_capabilities');

    // Remove the various buttons that try to allow page creation for everyone except admin
    function ehc_hide_new_page_buttons()
    {
        $user = wp_get_current_user();
        $role = $user->roles[0];
        if ($role === 'administrator') {
            return;
        }
        // Remove from admin sidebar
        global $submenu;
        unset($submenu['edit.php?post_type=page'][10]);
        // Remove from pages listing page
        if (isset($_GET['post_type']) && $_GET['post_type'] === 'page') {
            echo '<style>.page-title-action{display:none;visibility:hidden;}</style>';
        }
    }
    add_action('admin_init', 'ehc_hide_new_page_buttons');
}
