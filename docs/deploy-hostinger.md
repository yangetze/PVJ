# Hostinger Deployment Setup

Deployment works via **GitHub Webhook → deploy.php**. When a push lands on `main`, GitHub Actions calls `https://pvjcampamento.com/deploy.php` over HTTPS. The script verifies a shared secret, runs `git pull` in a private directory outside `public_html`, then rsyncs only the public web files into `public_html`.

This means `.gitignore`, `CLAUDE.md`, `docs/`, `deploy.php`, and other non-web files are **never visible** on the live site.

```
~/pvj-repo/          ← full git repo, private (not served)
~/domains/pvjcampamento.com/public_html/   ← only web files (html, css, js, assets)
```

---

## One-time setup (do this once)

### 1. Generate a secret token

In PowerShell:
```powershell
-join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Max 256) })
```

Copy the output.

### 2. Add the secret to GitHub

Go to **github.com/yangetze/PVJ → Settings → Secrets and variables → Actions → New repository secret**:

- Name: `DEPLOY_SECRET`
- Value: the token from step 1

### 3. SSH into Hostinger and clone the repo

From your own machine (not GitHub Actions):

```bash
ssh YOUR_USERNAME@YOUR_SSH_HOST -p 65002
```

Your SSH host and username are in Hostinger panel under **Hosting → Manage → SSH Access**.

Once connected, clone the repo to a private directory **outside** `public_html`:

```bash
cd ~
git clone https://github.com/yangetze/PVJ.git pvj-repo
```

Note the full path — you'll need it in step 4:
```bash
echo ~/pvj-repo
# e.g. /home/u123456789/pvj-repo
```

### 4. Create deploy-config.php in public_html

This file holds the secret and paths. It is excluded from git (`.gitignore`) so it never appears in the repo. Create it via **Hostinger → File Manager → public_html → New File** named `deploy-config.php`:

```php
<?php
define('DEPLOY_SECRET', 'YOUR_SECRET_HERE');  // same token as the GitHub secret
define('REPO_PATH',     '/home/u123456789/pvj-repo');          // path from step 3
define('PUBLIC_PATH',   '/home/u123456789/domains/pvjcampamento.com/public_html');
```

Replace `u123456789` with your real Hostinger username.

### 5. Copy deploy.php into public_html

`deploy.php` is in the repo but needs to be in `public_html` to be reachable. Copy it from the cloned repo:

```bash
cp ~/pvj-repo/deploy.php ~/domains/pvjcampamento.com/public_html/deploy.php
```

> After this, `deploy.php` in `public_html` is a one-time manual copy. Future deploys via rsync intentionally skip it (so the live copy is never overwritten by git changes). If you ever update `deploy.php` in the repo, re-run this `cp` command.

### 6. Do the first sync manually

Run the rsync once manually to populate `public_html` with the web files:

```bash
rsync -a --delete \
  --exclude=".git/" \
  --exclude=".gitignore" \
  --exclude="CLAUDE.md" \
  --exclude="docs/" \
  --exclude=".github/" \
  --exclude="deploy.php" \
  --exclude="deploy-config.php" \
  --exclude="*.md" \
  --exclude="README*" \
  ~/pvj-repo/ \
  ~/domains/pvjcampamento.com/public_html/
```

### 7. Merge PR #38 on GitHub

This activates the new webhook-based workflow. After merging, every push to `main` will deploy automatically.

### 8. Verify it works

Push any small change to `main`. Then check:

1. GitHub Actions → the `notify` job should show `HTTP 200`
2. Your change should be live on `pvjcampamento.com`
3. Visit `https://pvjcampamento.com/deploy.php` directly — should return `403 Forbidden` (correct, no signature)

---

## How it works (ongoing)

```
push to main
    └─► GitHub Actions calls deploy.php with HMAC-signed payload
            └─► deploy.php verifies signature
                    └─► git pull in ~/pvj-repo
                            └─► rsync web files → public_html
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Actions job fails with non-200 | deploy.php not reachable | Check that deploy.php exists in public_html (step 5) |
| `403 Forbidden` in Actions log | Secret mismatch | Make sure `DEPLOY_SECRET` in GitHub and in deploy-config.php are identical |
| `500 deploy-config.php not found` | Missing config file | Create deploy-config.php in public_html (step 4) |
| `git pull` errors in response | Repo not initialized | Redo step 3 |
| Changes not appearing | Hostinger cache | Clear LiteSpeed Cache in the control panel |
| Non-web files still visible | Old files in public_html | Run the rsync from step 6 manually |
