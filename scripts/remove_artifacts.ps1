# Safe removal / archiving of build/vendor artifacts
# Usage: run from repository root in PowerShell
# This script will:
#  - Move `_site` and `vendor` (if present) to a timestamped backup directory outside the repo
#  - If a .git directory is present, run `git rm --cached` to untrack them and optionally commit the change

param(
    [switch]$ArchiveOnly,    # If set, only move files, do not run git commands
    [switch]$AutoCommit       # If set and .git is present, automatically commit the removal
)

function Timestamp { Get-Date -Format "yyyyMMdd-HHmmss" }

$repoRoot = Get-Location
$backupRoot = Join-Path $repoRoot "..\repo_backup_$(Timestamp)"
Write-Host "Repo root: $repoRoot"
Write-Host "Backup root: $backupRoot"

# Directories to clean
$targets = @("_site","vendor","vendor/bundle")
$found = @()
foreach ($t in $targets) {
    $full = Join-Path $repoRoot $t
    if (Test-Path $full) { $found += $t }
}

if ($found.Count -eq 0) {
    Write-Host "No target directories found: _site or vendor. Nothing to do."
    exit 0
}

# Create backup folder
New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null

foreach ($t in $found) {
    $src = Join-Path $repoRoot $t
    $dest = Join-Path $backupRoot ($t -replace '/','_')
    Write-Host "Moving $src -> $dest"
    try {
        Move-Item -LiteralPath $src -Destination $dest -Force
    } catch {
        Write-Warning "Failed to move $t: $_. Exception.Message"
    }
}

if ($ArchiveOnly) {
    Write-Host "ArchiveOnly set. Skipping git operations. Backed up artifacts at: $backupRoot"
    exit 0
}

# If git exists, run git rm --cached and update .gitignore
$gitDir = Join-Path $repoRoot ".git"
if (Test-Path $gitDir) {
    Write-Host "Git repo detected. Updating index to untrack artifacts..."
    # Untrack paths
    git rm -r --cached _site 2>$null
    git rm -r --cached vendor 2>$null

    # Ensure .gitignore contains needed entries
    $gitignore = Join-Path $repoRoot ".gitignore"
    $mustContain = @("_site/","vendor/","vendor/bundle/")
    $existing = @()
    if (Test-Path $gitignore) { $existing = Get-Content $gitignore -ErrorAction SilentlyContinue }
    foreach ($m in $mustContain) {
        if (-not ($existing -contains $m)) { Add-Content -Path $gitignore -Value $m; Write-Host "Added $m to .gitignore" }
    }

    if ($AutoCommit) {
        git add .gitignore
        git commit -m "Remove build/vendor artifacts and update .gitignore" || Write-Warning "Commit failed or no changes to commit"
        Write-Host "Committed removal. You may now push the changes."
    } else {
        Write-Host "Artifacts moved and index updated. Please run the following commands to finish the cleanup:"
        Write-Host "```powershell"
        Write-Host "git add .gitignore"
        Write-Host "git commit -m \"Remove build/vendor artifacts and update .gitignore\""
        Write-Host "git push origin HEAD"
        Write-Host "```"
    }
} else {
    Write-Warning ".git directory not found. Moved artifacts to backup location but cannot update git index. Run the script from the repository root where .git exists."
}

Write-Host "Done. Backup location: $backupRoot"