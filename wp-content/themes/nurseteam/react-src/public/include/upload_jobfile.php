<?php
/*
 * Add ability to upload csv file to a static location, so upload script created
 * in wp-all-import-pro can be run without any modification
 */

if (!function_exists('ehc_upload_jobfile')) {
    function ehc_upload_jobfile()
    {
        error_log(var_dump($_FILES));

        // Dirname and filename are from filename and randomly generated target
        // folder generated when first running wp-all-import
        $dirname =
            trailingslashit(WP_CONTENT_DIR) .
            '/uploads/wpallimport/uploads/bf8a8fc79284063d27f2a95da0ae5658';
        $filename = '20200518022357.csv';

        // Only for local & dev testing -- create dir if not there
        // We know dir exists on live
        if (!is_dir($dirname)) {
            wp_mkdir_p($dirname);
        }

        // Move the file! move_uploaded_file will overwrite existing file
        $jobs_source = $_FILES['new_jobfile']['tmp_name'];
        $jobs_dest = trailingslashit($dirname) . $filename;
        move_uploaded_file($jobs_source, $jobs_dest);

        // Reload admin page with query string to indicate success
        $from = untrailingslashit($_SERVER['HTTP_REFERER']);
        $to = strpos($from, '?s=true') !== false ? $from : $from . '?s=true';
        wp_redirect($to);
        // Kill the process
        die();
    }
    add_action('admin_post_dashboard_uploadjobs', 'ehc_upload_jobfile');

    // Add the upload widget to the dashboard!
    function ehc_add_upload_jobfile_widget()
    {
        wp_add_dashboard_widget(
            'ehc_upload_jobfile_widget',
            'Upload Jobs',
            'ehc_build_upload_jobfile_widget'
        );
    }
    add_action('wp_dashboard_setup', 'ehc_add_upload_jobfile_widget');

    function ehc_build_upload_jobfile_widget()
    {
        ?>
        <form action="<?php echo esc_url(
            admin_url('admin-post.php')
        ); ?>" method="POST" encType="multipart/form-data">
          <?php if (isset($_GET['s'])) {
              echo '<p style="background:green;color:white;font-weight:700;padding:0.5rem;">File uploaded</p>';
          } ?>
          <p style="font-weight:700;font-style:italic;">Job file MUST be in .csv format</p>
          <input name="new_jobfile" type="file" accept=".csv, text/csv" required />
          <input type="hidden" name="action" value="dashboard_uploadjobs" />
          <input class="button button-primary" type="submit" name="upload-jobs" value="Upload Jobs" />
        </form>
    <?php
    }
}
