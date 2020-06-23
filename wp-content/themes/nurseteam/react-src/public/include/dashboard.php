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
            remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
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
    function ehc_build_add_job_widget()
    {
        // Action of form submission handled by ehc_add_job_from_dashboard function
        $states = json_decode(file_get_contents(__DIR__ . '/states.json'));
        $specialties = json_decode(
            file_get_contents(__DIR__ . '/specialties.json')
        );
        ?>
        <form class="add_job_widget" action="<?php echo esc_url(
            admin_url('admin-post.php')
        ); ?>" method="POST">
          <style>
            .add_job_widget label:not(.textarealabel) {
              display: inline-block;
              min-width: 5rem;
              margin-bottom: 1rem;
            }
            .add_job_widget textarea {
              width: 100%;
              margin-bottom: 1rem;
              min-height: 5rem;
            }
          </style>
          <label for="sourceid">Source ID:</label><input type="text" name="sourceid" id="sourceid" value="" /><br />
          <label for="city">City:</label><input type="text" name="city" id="city" value="" /><br />
          <label for="state">State:</label><select name="state" id="state" value="">
            <?php foreach ($states as $state) {
                echo '<option value="' .
                    $state->abbreviation .
                    '">' .
                    $state->name .
                    '</option>';
            } ?>
          </select>
          <br />
          <label for="startdate">Start Date:</label><input type="date" name="startdate" id="startdate" value="" /><br />
          <label for="duration">Duration:</label><input type="text" name="duration" id="duration" value="" /><br />
          <label for="specialty">Specialty:</label><select name="specialty" id="specialty" value="">
            <?php foreach ($specialties as $specialty) {
                echo '<option value="' .
                    $specialty->name .
                    '">' .
                    $specialty->name .
                    '</option>';
            } ?>
          </select>
          <br />
          <label for="unit">Unit:</label><input type="text" name="unit" id="unit" value="" /><br />
          <label for="shift">Shift:</label><input type="text" name="shift" id="shift" value="" /><br />
          <label class="textarealabel" for="pay">Pay Info:</label><br /><textarea name="pay" id="pay"></textarea><br />
          <label class="textarealabel" for="description">Description:</label><br /><textarea name="description" id="description"></textarea><br />
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
            'numberposts' => -1,
        ];
        $jobs = get_posts($args);
        // Form to handle submission
        ?>
        <form class="delete_job_widget" action="<?php echo esc_url(
            admin_url('admin-post.php')
        ); ?>" method="POST">
        <style>
          table.deleteJobs {
            border-collapse:collapse;
            width:100%;
          }
          table.deleteJobs th, table.deleteJobs td {
            border-bottom: 1px solid #444;
            padding:.2rem .5rem .3rem;
          }
          table.deleteJobs th {
            text-align:left;
          }
        </style>
        <input class="button button-primary" type="submit" name="add-job" value="Delete selected" />
        <table class="deleteJobs">
          <tr>
            <th></th>
            <th>Source ID</th>
            <th>City</th>
            <th>Specialty</th>
          </tr>
        <?php foreach ($jobs as $job):
            $meta = get_post_meta($job->ID); ?>
                <tr>
                  <td><input type="checkbox" name="selectedIDs[]" value="<?php echo $job->ID; ?>"/></td>
                  <td><?php echo $meta['_job_sourceid'][0]; ?></td>
                  <td><?php echo $meta['_job_city'][0]; ?></td>
                  <td><?php echo $meta['_job_specialty'][0]; ?></td>
                </tr>
        <?php
        endforeach; ?>
        </table><br />
        <input type="hidden" name="action" value="dashboard_deletejob">
        <input class="button button-primary" type="submit" name="delete-jobs" value="Delete selected" />
      </form>
      <?php
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
        // Docs say to die at end of handler
        die();
    }
    add_action('admin_post_dashboard_addjob', 'ehc_add_job_from_dashboard');
}

if (!function_exists('ehc_delete_job_from_dashboard')) {
    function ehc_delete_job_from_dashboard()
    {
        $testString = '';
        foreach ($_REQUEST['selectedIDs'] as $localId) {
            // Delete all selected posts by their local IDs
            // Will actually just move them to trash
            wp_delete_post($localId);
        }
        // Refresh admin page
        wp_redirect($_SERVER['HTTP_REFERER']);
        // Docs say to die at end of handler
        die();
    }
    add_action(
        'admin_post_dashboard_deletejob',
        'ehc_delete_job_from_dashboard'
    );
}
