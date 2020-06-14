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
        // Combine first and last names for display
        $applicant_name =
            get_post_meta($post->ID, '_app_firstname', true) .
            ' ' .
            get_post_meta($post->ID, '_app_lastname', true);// Markup!
        ?>
          <style media="screen">
            .app-info {
              font-size: 1rem;
            }
            .app-info .key {
              font-weight: 700;
            }
          </style>
          <div class="app-info">
              <h3><?php echo $applicant_name; ?></h3>
            <div>
              <span class="key">Phone:</span>
              <span class="value"><?php echo get_post_meta(
                  $post->ID,
                  '_app_phone',
                  true
              ); ?></span>
            </div>
            <div>
              <span class="key">Email:</span>
              <span class="value"><?php echo get_post_meta(
                  $post->ID,
                  '_app_email',
                  true
              ); ?></span>
            </div>
            <div>
              <span class="key">Job:</span>
              <span class="value"><?php echo get_post_meta(
                  $post->ID,
                  '_app_job_sourceid',
                  true
              ) .
                  ' - ' .
                  get_post_meta(
                      $post->ID,
                      '_app_job_display_title',
                      true
                  ); ?></span>
            </div>
            <div>
              <span class="key">Resume:</span>
              <span class="value">
                <a href="<?php echo get_template_directory_uri() .
                    '/uploads/' .
                    get_post_meta(
                        $post->ID,
                        '_app_resume',
                        true
                    ); ?>" target="_blank">
                  View File
                </a>
              </span>
            </div>
            <div>
              <span class="key">Cover Letter:</span>
              <span class="value">
                <a href="<?php echo get_template_directory_uri() .
                    '/uploads/' .
                    get_post_meta(
                        $post->ID,
                        '_app_coverletter',
                        true
                    ); ?>" target="_blank">
                  View File
                </a>
              </span>
            </div>
          </div>
        <?php
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
        // First, grab request info that we'll use for more than just piping it into the new post
        $firstname = sanitize_text_field($_REQUEST['firstname']);
        $lastname = sanitize_text_field($_REQUEST['lastname']);
        $localid = sanitize_text_field($_REQUEST['localid']);
        $sourceid = sanitize_text_field($_REQUEST['whichJob']);
        $email = sanitize_email($_REQUEST['email']);
        $phone = sanitize_text_field($_REQUEST['phone']);

        // Use local id to recreate job display title provided in job API
        $job_title =
            get_post_meta($localid, '_job_specialty', true) .
            ' in ' .
            get_post_meta($localid, '_job_city', true) .
            ', ' .
            get_post_meta($localid, '_job_state', true);

        // Handle file uploads
        // Get the custom application upload directory

        $app_dir =
            trailingslashit(plugin_dir_path(dirname(__FILE__))) . 'uploads';
        // If dir isn't there, make it!
        if (!is_dir($app_dir)) {
            wp_mkdir_p($app_dir);
        }

        // Build filenames
        $resume_filename = wp_unique_filename(
            $app_dir,
            'resume_' . $sourceid . '_' . $lastname
        );
        $coverletter_filename = wp_unique_filename(
            $app_dir,
            'coverletter_' . $sourceid . '_' . $lastname
        );

        // Add correct extensions to filenames
        $resume_extension = array_pop(explode('.', $_FILES['resume']['name']));
        if (strlen($resume_extension) > 0) {
            $resume_filename .= '.' . $resume_extension;
        }
        $coverletter_extension = array_pop(
            explode('.', $_FILES['coverletter']['name'])
        );
        if (strlen($coverletter_extension) > 0) {
            $coverletter_filename .= '.' . $coverletter_extension;
        }

        // Grab the temporarly files from $_FILES, and put them in our custom directory
        $resume_source = $_FILES['resume']['tmp_name'];
        $resume_dest = trailingslashit($app_dir) . $resume_filename;
        move_uploaded_file($resume_source, $resume_dest);
        $coverletter_source = $_FILES['coverletter']['tmp_name'];
        if (strlen($coverletter_source) > 0) {
            $coverletter_dest =
                trailingslashit($app_dir) . $coverletter_filename;
            move_uploaded_file($coverletter_source, $coverletter_dest);
        } else {
            $coverletter_dest = false;
        }

        // Collect args and create the post
        $args = [
            'ID' => 0,
            'post_type' => 'ehc_application',
            'post_status' => 'publish',
            'meta_input' => [
                '_app_firstname' => $firstname,
                '_app_lastname' => $lastname,
                '_app_email' => $email,
                '_app_phone' => $phone,
                '_app_job_sourceid' => $sourceid,
                '_app_job_localid' => $localid,
                '_app_job_display_title' => $job_title,
                '_app_resume' => $resume_filename,
                '_app_coverletter' =>
                    !$coverletter_dest ?: $coverletter_filename,
            ],
        ];
        wp_insert_post($args);

        // Send Marc an email with the application info
        // All the prettier-ignores are to maintain double quotes for text formatting
        // prettier-ignore
        $address = "lucasod@gmail.com";
        // prettier-ignore
        $subject = "App submitted for " . $job_title;
        // prettier-ignore
        $message =
            "An application was submitted by " .
            $firstname .
            " " .
            $lastname .
            " for " .
            $job_title .
            ":";
        // prettier-ignore
        $message .= "\n\n";
        // prettier-ignore
        $message .= "Applicant Name: " . $firstname . " " . $lastname . "\n";
        // prettier-ignore
        $message .= "Email: " . $email . "\n";
        // prettier-ignore
        $message .= "Phone: " . $phone . "\n\n";
        // prettier-ignore
        $message .=
            "Resume and coverletter (if submitted) are attached to this email.\n";
        $attachments = [$resume_dest];
        if ($coverletter_dest) {
            array_push($attachments, $coverletter_dest);
        }
        wp_mail($address, $subject, $message, '', $attachments);

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
        // Echo the output based on column
        if ($column === 'sourceid') {
            echo get_post_meta($post_id, '_app_job_sourceid', true);
        } elseif ($column === 'name') {
            echo $full_name;
        } elseif ($column === 'job') {
            echo get_post_meta($post_id, '_app_job_display_title', true);
        }
    }
    add_action(
        'manage_ehc_application_posts_custom_column',
        'ehc_fill_application_columns',
        10,
        2
    );
}
