<?php
/*
 * Handle input from front-end contact form
 */

if (!function_exists('ehc_handle_contact_submission')) {
    function ehc_handle_contact_submission()
    {
        // Just dump the request on the page after form submission, for now
        var_dump($_REQUEST);
        die();
    }
    add_action(
        'admin_post_submit_contactform',
        'ehc_handle_contact_submission'
    );
}
