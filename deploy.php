<?php
/**
 * Webhook endpoint called by GitHub Actions on every push to main.
 * Verifies the HMAC-SHA256 signature then runs `git pull origin main`.
 *
 * Setup: set DEPLOY_SECRET in this file (or via an env var) to the same
 * value stored in the GitHub Actions secret DEPLOY_SECRET.
 */

define('DEPLOY_SECRET', getenv('DEPLOY_SECRET') ?: 'REPLACE_WITH_YOUR_SECRET');
define('REPO_PATH',     '/home/u123456789/domains/pvjcampamento.com/public_html'); // update with your Hostinger username

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
