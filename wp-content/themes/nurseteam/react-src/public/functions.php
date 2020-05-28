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
