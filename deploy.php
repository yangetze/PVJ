<?php
/**
 * Webhook endpoint called by GitHub Actions on every push to main.
 * Verifies the HMAC-SHA256 signature then runs `git pull origin main`.
 *
 * Setup: set DEPLOY_SECRET in this file (or via an env var) to the same
 * value stored in the GitHub Actions secret DEPLOY_SECRET.
 */

// Secret lives in deploy-config.php (excluded from git, created manually on the server)
if (file_exists(__DIR__ . '/deploy-config.php')) {
    require __DIR__ . '/deploy-config.php';
} else {
    http_response_code(500);
    exit('deploy-config.php not found');
}
// DEPLOY_SECRET and REPO_PATH are defined in deploy-config.php

// Verify signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload   = file_get_contents('php://input');
$expected  = 'sha256=' . hash_hmac('sha256', $payload, DEPLOY_SECRET);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    exit('Forbidden');
}

// Run git pull
$output = shell_exec('cd ' . escapeshellarg(REPO_PATH) . ' && git pull origin main 2>&1');

http_response_code(200);
echo "OK\n" . htmlspecialchars($output);
