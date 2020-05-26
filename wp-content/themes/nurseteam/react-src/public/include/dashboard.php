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
            // Remove welcome panel
            remove_action('welcome_panel', 'wp_welcome_panel');
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
    // TODO: Make these actually do something! They're just dumb HTML, right now
    function ehc_build_add_job_widget()
    {
        // Action of form submission handled by ehc_add_job_from_dashboard function
        ?>
        <form class="add_job_widget" action="<?php echo esc_url(
            admin_url('admin-post.php')
        ); ?>" method="POST">
          Source ID: <input type="text" name="sourceid" value="" /><br />
          City: <input type="text" name="city" value="" /><br />
          State: <input type="text" name="state" value="" /><br />
          Start Date: <input type="date" name="startdate" value="" /><br />
          Duration: <input type="text" name="duration" value="" /><br />
          Specialty: <input type="text" name="specialty" value="" /><br />
          Unit: <input type="text" name="unit" value="" /><br />
          Shift: <input type="text" name="shift" value="" /><br />
          Pay Info:<br /><textarea name="pay"></textarea><br />
          Description:<br /><textarea name="description"></textarea><br />
          <input type="hidden" name="action" value="dashboard_addjob">
          <input class="button button-primary" type="submit" name="delete-jobs" value="Add Job" />
        </form>
        <?php
    }
    function ehc_build_delete_job_widget()
    {
        // First, we need to get all the jobs
        $args = [
            'post_type' => 'ehc_job',
        ];
        $jobs = get_posts($args);
        // Styles for the table
        echo '<style>table.deleteJobs{border-collapse:collapse;width:100%;}table.deleteJobs th,table.deleteJobs td{border-bottom:1px solid #444;padding:.2rem .5rem .3rem;}table.deleteJobs th{text-align:left;}</style>';
        // And now the table itself
        echo '<table class="deleteJobs"><tr><th></th><th>Source ID</th><th>City</th><th>Specialty</th></tr>';
        foreach ($jobs as $job):
            // Meta is where the data we want live
            $meta = get_post_meta($job->ID); ?>
            <tr>
              <td><input type="checkbox" /></td>
              <td><?php echo $meta['_job_sourceid'][0]; ?></td>
              <td><?php echo $meta['_job_city'][0]; ?></td>
              <td><?php echo $meta['_job_specialty'][0]; ?></td>
            </tr>
        <?php
        endforeach;
        echo '</table><br />';
        echo '<input class="button button-primary" type="submit" name="delete-jobs" value="Delete selected" />';
    }
}

/*
 * Handlers for form submission of dashboard widgets
 */
if (!function_exists('ehc_add_job_from_dashboard')) {
    function ehc_add_job_from_dashboard()
    {
        // Construct args for wp_insert_post from form contents
        $args = [
            'ID' => 0, // 0 just means assign it the next ID
            'post_type' => 'ehc_job',
            'post_status' => 'publish',
            'meta_input' => [
                '_job_sourceid' => $_REQUEST['sourceid'] ?: '',
                '_job_city' => $_REQUEST['city'] ?: '',
                '_job_state' => $_REQUEST['state'] ?: '',
                '_job_startdate' => $_REQUEST['startdate'] ?: '',
                '_job_duration' => $_REQUEST['duration'] ?: '',
                '_job_specialty' => $_REQUEST['specialty'] ?: '',
                '_job_unit' => $_REQUEST['unit'] ?: '',
                '_job_shift' => $_REQUEST['shift'] ?: '',
                '_job_pay' => $_REQUEST['pay'] ?: '',
                '_job_description' => $_REQUEST['description'] ?: '',
            ],
        ];
        // Make the new post!
        wp_insert_post($args);
        // Redirect to admin page (basically just a reload)
        wp_redirect($_SERVER['HTTP_REFERER']);
        die('Done!');
    }
    add_action('admin_post_dashboard_addjob', 'ehc_add_job_from_dashboard');
}
