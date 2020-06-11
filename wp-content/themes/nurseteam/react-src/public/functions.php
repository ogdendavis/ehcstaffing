<?php

// Bring in custom job post type
require_once __DIR__ . '/include/jobs.php';
// Customize back-end dashboard
require_once __DIR__ . '/include/dashboard.php';
// Remove add/delete page capability for editors
require_once __DIR__ . '/include/capabilities.php';
// API init
require_once __DIR__ . '/include/api_jobs.php';
// Handle form submissions
require_once __DIR__ . '/include/forms.php';
// Create custom application post type & handle form submission
require_once __DIR__ . '/include/applications.php';
// Create endpoint to get all content (inc custom fields) for homepage
require_once __DIR__ . '/include/api_homepage.php';
