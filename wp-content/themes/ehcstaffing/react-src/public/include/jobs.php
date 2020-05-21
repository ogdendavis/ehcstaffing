<?php
/*
 * Declare custom post type for jobs, create a custom meta box for that post
 * type, add fields to the meta box, and save those fields on post save.
 * TODO: hide unneeded fields on edit page
 * TODO: display relevant data in back-end Jobs listing page
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
            City: <input type="text" name="city" value="<?php echo $saved_city; ?>" />
            State: <input type="text" name="state" value="<?php echo $saved_state; ?>" />
            Start Date: <input type="date" name="date" value="<?php echo $saved_startdate; ?>" />
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
            'city',
            'state',
            'date',
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
