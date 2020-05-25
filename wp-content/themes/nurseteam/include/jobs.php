<?php
/*
 * Declare custom post type for jobs, create a custom meta box for that post
 * type, add fields to the meta box, and save those fields on post save.
 */

/*
 * Add custom post type for jobs
 */
if (!function_exists('ehc_custom_post_types')) {
    function ehc_custom_post_types()
    {
        register_post_type('ehc_job', [
            'labels' => [
                'name' => 'Jobs',
                'singular_name' => 'Job',
            ],
            'public' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-businessman',
            'supports' => [''],
            'rewrite' => ['slug' => 'jobs'],
        ]);
    }
    add_action('init', 'ehc_custom_post_types');
}

/*
 * Programmatically add meta box for custom fields for job posts
 */
if (!function_exists('ehc_add_job_meta')) {
    function ehc_add_job_meta()
    {
        add_meta_box(
            'ehc_job_info',
            'Job Info',
            'build_ehc_job_info',
            'ehc_job',
            'normal',
            'high'
        );
    }
    add_action('add_meta_boxes_ehc_job', 'ehc_add_job_meta');

    // Helper functions to echo HTML for meta box above
    function build_ehc_job_info($post)
    {
        // Nonce field makes sure the form submission comes from WordPress
        wp_nonce_field(basename(__FILE__), 'ehc_job_info_nonce');

        // Get existing values. If none exist, will return empty string
        $saved_sourceid = get_post_meta($post->ID, '_job_sourceid', true);
        $saved_city = get_post_meta($post->ID, '_job_city', true);
        $saved_state = get_post_meta($post->ID, '_job_state', true);
        $saved_startdate = get_post_meta($post->ID, '_job_startdate', true);
        $saved_duration = get_post_meta($post->ID, '_job_duration', true);
        $saved_specialty = get_post_meta($post->ID, '_job_specialty', true);
        $saved_unit = get_post_meta($post->ID, '_job_unit', true);
        $saved_shift = get_post_meta($post->ID, '_job_shift', true);
        $saved_pay = get_post_meta($post->ID, '_job_pay', true);
        $saved_description = get_post_meta($post->ID, '_job_description', true);
        // HTML output below
        ?>
          <div class="ehc_job_info">
            Source ID: <input type="text" name="sourceid" value="<?php echo $saved_sourceid; ?>" />
            City: <input type="text" name="city" value="<?php echo $saved_city; ?>" />
            State: <input type="text" name="state" value="<?php echo $saved_state; ?>" />
            Start Date: <input type="date" name="startdate" value="<?php echo $saved_startdate; ?>" />
            Duration: <input type="text" name="duration" value="<?php echo $saved_duration; ?>" />
            Specialty: <input type="text" name="specialty" value="<?php echo $saved_specialty; ?>" />
            Unit: <input type="text" name="unit" value="<?php echo $saved_unit; ?>" />
            Shift: <input type="text" name="shift" value="<?php echo $saved_shift; ?>" />
            Pay Info: <textarea name="pay"><?php echo $saved_pay; ?></textarea>
            Description: <textarea name="description"><?php echo $saved_description; ?></textarea>
          </div>

        <?php
    }

    // Store data from meta box on job post save
    function save_ehc_job_info($post_id)
    {
        // We don't want to save if the nonce is invalid, if it's an autosave, or if the user doesn't have permission to edit the post
        if (
            !isset($_POST['ehc_job_info_nonce']) ||
            !wp_verify_nonce($_POST['ehc_job_info_nonce'], basename(__FILE__))
        ) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Now do the saving!
        // For each value, check if it's set. If so, use update_post_meta to save it!
        $fields = [
            'sourceid',
            'city',
            'state',
            'startdate',
            'duration',
            'specialty',
            'unit',
            'shift',
            'pay',
            'description',
        ];
        foreach ($fields as $field) {
            if (isset($_REQUEST[$field])) {
                update_post_meta(
                    $post_id,
                    '_job_' . $field,
                    sanitize_text_field($_POST[$field])
                );
            }
        }
    }
    add_action('save_post_ehc_job', 'save_ehc_job_info');
}

/*
 * Change post columns on job post list page
 */
if (!function_exists('ehc_add_job_columns')) {
    // Add the columns to the list page
    function ehc_add_job_columns($columns)
    {
        // We're not using any of the original columns, so start from scratch
        $new_columns = [
            'cb' => __('<input type="checkbox" />'),
            'sourceid' => __('Source ID'),
            'localid' => __('Local ID'),
            'city' => __('City'),
            'specialty' => __('Specialty'),
            'jobstart' => __('Job Start'),
        ];
        return $new_columns;
    }
    // Note that this hook ends in plural 'columns'
    add_filter('manage_ehc_job_posts_columns', 'ehc_add_job_columns');

    // Populate the columns with data
    function ehc_fill_job_columns($column, $post_id)
    {
        if ($column === 'sourceid') {
            echo get_post_meta($post_id, '_job_sourceid', true);
        } elseif ($column === 'localid') {
            echo $post_id;
        } elseif ($column === 'city') {
            echo get_post_meta($post_id, '_job_city', true);
        } elseif ($column === 'specialty') {
            echo get_post_meta($post_id, '_job_specialty', true);
        } elseif ($column === 'jobstart') {
            $startdate = get_post_meta($post_id, '_job_startdate', true);
            echo $startdate;
        }
    }
    // Note that this hook ends in singular 'column'
    add_action(
        'manage_ehc_job_posts_custom_column',
        'ehc_fill_job_columns',
        10,
        2
    );
}
