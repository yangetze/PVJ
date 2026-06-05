# Hostinger Deployment Setup

Deployment works via **GitHub Webhook → deploy.php**. When a push lands on `main`, GitHub Actions calls `https://pvjcampamento.com/deploy.php` over HTTPS. The script verifies a shared secret and runs `git pull origin main` on the server. No SSH ports need to be open.

---

## One-time setup (do this once)

### 1. Generate a secret token

Run this locally to get a random secret:

```bash
openssl rand -hex 32
```

Copy the output — you'll use it in steps 2 and 3.

### 2. Add the secret to GitHub

Go to **github.com/yangetze/PVJ → Settings → Secrets and variables → Actions → New repository secret**:

- Name: `DEPLOY_SECRET`
- Value: the token from step 1

### 3. Create deploy-config.php on the server

This file holds the secret and path — it is excluded from git (via `.gitignore`) so it never appears in the repo.

After completing step 4 (git clone), go to **Hostinger → File Manager → public_html** and create a new file named `deploy-config.php` with this content:

```php
<?php
define('DEPLOY_SECRET', 'YOUR_SECRET_HERE'); // same token as the GitHub secret
define('REPO_PATH',     '/home/u123456789/domains/pvjcampamento.com/public_html'); // your real path
```

To find your real path and username: in Hostinger panel go to **Hosting → Manage → SSH Access** — the username (e.g. `u123456789`) is shown there. The full path is `/home/USERNAME/domains/pvjcampamento.com/public_html`.

Commit and push `deploy.php` to main — it will be synced to the server in step 5.

### 4. SSH into Hostinger and initialize the git repo

Do this once from your own machine (not GitHub Actions):

```bash
ssh u123456789@your-hostinger-ssh-host -p 65002
```

Then inside the server:

```bash
cd ~/domains/pvjcampamento.com/public_html

# Back up existing files if any
# Then initialize git and pull the repo
git init
git remote add origin https://github.com/yangetze/PVJ.git
git fetch origin main
git checkout -b main --track origin/main
```

If the directory already has files and you want to overwrite them:

```bash
git fetch origin main
git reset --hard origin/main
```

### 5. Verify it works

Push any small change to `main`. Then check:

1. GitHub Actions → the `notify` job should show `HTTP 200`
2. Visit `https://pvjcampamento.com/deploy.php` directly — it should return `403 Forbidden` (correct, no signature)
3. Your change should be live on the site

---

## How it works (ongoing)

```
push to main
    └─► GitHub Actions calls deploy.php with HMAC-signed payload
            └─► deploy.php verifies signature → runs git pull origin main
                    └─► site is updated
```

Every push to `main` automatically deploys within seconds. No manual steps needed after the one-time setup above.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Actions job fails with non-200 | deploy.php not reachable or path wrong | Check `REPO_PATH` in deploy.php |
| `403 Forbidden` in Actions log | Secret mismatch | Make sure `DEPLOY_SECRET` in GitHub and in deploy.php are identical |
| `git pull` output shows errors | Git not initialized on server | Redo step 4 |
| Changes not appearing | Hostinger cache | Clear LiteSpeed Cache in the control panel |
