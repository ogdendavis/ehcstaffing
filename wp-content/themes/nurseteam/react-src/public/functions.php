<?php

// Bring in custom job post type
require_once __DIR__ . '/include/jobs.php';
// Customize back-end dashboard
require_once __DIR__ . '/include/dashboard.php';
// API init
require_once __DIR__ . '/include/api_jobs.php';
// Handle contact form submissions
require_once __DIR__ . '/include/contact.php';
// Create custom application post type & handle form submission
require_once __DIR__ . '/include/applications.php';
// Create endpoint to get all content (inc custom fields) for homepage
require_once __DIR__ . '/include/api_homepage.php';
// Upload job file to static location for wp-upload-all script
require_once __DIR__ . '/include/upload_jobfile.php';
