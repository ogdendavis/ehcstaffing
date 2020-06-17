<?php
/*
 * Handle input from front-end forms
 */

// Contact form
if (!function_exists('ehc_handle_contact_submission')) {
    function ehc_handle_contact_submission()
    {
        // Sanitize input fields
        $firstname = sanitize_text_field($_REQUEST['firstname']);
        $lastname = sanitize_text_field($_REQUEST['lastname']);
        $email = sanitize_email($_REQUEST['email']);
        $phone = sanitize_text_field($_REQUEST['phone']);
        $message = sanitize_text_field($_REQUEST['message']);

        // Only deal with resume if user has attached it!
        $has_attachment = false;
        if ($_FILES['resume']['error'] === 0) {
            $has_attachment = true;

            $resume_dir = trailingslashit(WP_CONTENT_DIR) . 'contact_uploads';
            // If dir isn't there, make it!
            if (!is_dir($resume_dir)) {
                wp_mkdir_p($resume_dir);
            }
            // Build filenames
            $resume_filename = wp_unique_filename(
                $resume_dir,
                'resume_' . $lastname
            );
            // Add extension to filename
            $resume_parts = explode('.', $_FILES['resume']['name']);
            $resume_extension = array_pop($resume_parts);
            if (strlen($resume_extension) > 0) {
                $resume_filename .= '.' . $resume_extension;
            }
            // Grab the temporarly file from $_FILES, and put it in our custom directory
            $resume_source = $_FILES['resume']['tmp_name'];
            $resume_dest = trailingslashit($resume_dir) . $resume_filename;
            move_uploaded_file($resume_source, $resume_dest);
        }

        // Build the email
        // All the prettier-ignores are to maintain double quotes for text formatting
        // prettier-ignore
        $address = "lucasod@gmail.com";
        // prettier-ignore
        $subject = "Contact form submission from " . $firstname . " " . $lastname;
        // prettier-ignore
        $body = "A message has been sent from " . $firstname . " " . $lastname . ".";
        // prettier-ignore
        $body .= "\n\n";
        $body .= $message;
        $attachment = $has_attachment ? [$resume_dest] : [];
        wp_mail($address, $subject, $body, '', $attachment);

        // Reload page with query string indicating form was submitted
        $from = untrailingslashit($_SERVER['HTTP_REFERER']);
        $to = strpos($from, '?s=true') !== false ? $from : $from . '?s=true';
        wp_redirect($to);
        die();
    }
    add_action(
        'admin_post_submit_contactform',
        'ehc_handle_contact_submission'
    );
    add_action(
        'admin_post_nopriv_submit_contactform',
        'ehc_handle_contact_submission'
    );
}
