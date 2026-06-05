<?php
/**
 * Webhook endpoint called by GitHub Actions on every push to main.
 * Verifies the HMAC-SHA256 signature, runs git pull in the repo directory
 * (outside public_html), then rsyncs only the public web files into public_html.
 *
 * deploy-config.php (excluded from git) must define:
 *   DEPLOY_SECRET  — shared HMAC token (same as GitHub Actions secret)
 *   REPO_PATH      — absolute path to the cloned repo (outside public_html)
 *   PUBLIC_PATH    — absolute path to public_html
 */

if (file_exists(__DIR__ . '/deploy-config.php')) {
    require __DIR__ . '/deploy-config.php';
} else {
    http_response_code(500);
    exit('deploy-config.php not found');
}

// Verify signature
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload   = file_get_contents('php://input');
$expected  = 'sha256=' . hash_hmac('sha256', $payload, DEPLOY_SECRET);

if (!hash_equals($expected, $signature)) {
    http_response_code(403);
    exit('Forbidden');
}

// Pull latest code into the private repo directory
$pull = shell_exec('cd ' . escapeshellarg(REPO_PATH) . ' && git pull origin main 2>&1');

// Sync only public web files into public_html, excluding non-public files
$rsync = shell_exec(
    'rsync -a --delete ' .
    '--exclude=".git/" ' .
    '--exclude=".gitignore" ' .
    '--exclude="CLAUDE.md" ' .
    '--exclude="docs/" ' .
    '--exclude=".github/" ' .
    '--exclude="deploy.php" ' .
    '--exclude="deploy-config.php" ' .
    '--exclude="*.md" ' .
    '--exclude="README*" ' .
    escapeshellarg(REPO_PATH . '/') . ' ' .
    escapeshellarg(PUBLIC_PATH . '/') . ' 2>&1'
);

http_response_code(200);
echo "OK\n\n--- git pull ---\n" . htmlspecialchars($pull) .
     "\n--- rsync ---\n"       . htmlspecialchars($rsync);
