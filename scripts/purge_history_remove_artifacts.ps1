<#
Purge history helper (PowerShell)
Usage (run from repo root where .git exists):
  # Dry run (shows what would be removed):
  .\scripts\purge_history_remove_artifacts.ps1 -WhatIf

  # Actual run (removes `_site` and `vendor` from history and force-pushes):
  .\scripts\purge_history_remove_artifacts.ps1 -AutoPush

Caution: This rewrites Git history. Coordinate with collaborators and rotate secrets before pushing.
#>
param(
    [switch]$AutoPush,
    [string[]]$ExtraPaths,
    [switch]$DryRun
)

function Timestamp { Get-Date -Format "yyyyMMdd-HHmmss" }

if (-not (Test-Path ".git")) {
    Write-Error ".git directory not found. Run this script from the repository root where .git exists."
    exit 1
}

$repoRoot = Get-Location
$backupDir = Join-Path $repoRoot "..\repo_backup_$(Timestamp)"
Write-Host "Backing up repository as a bare mirror to: $backupDir.git"

git clone --mirror . "$backupDir.git"
if ($LASTEXITCODE -ne 0) { Write-Error "Mirror clone failed; aborting."; exit 1 }

# Ensure git-filter-repo is available
if (-not (Get-Command git-filter-repo -ErrorAction SilentlyContinue)) {
    Write-Host "git-filter-repo not found. Attempting to install via pip..."
    if (-not (Get-Command pip -ErrorAction SilentlyContinue)) { Write-Warning "pip not found. Please install Python/pip and then install git-filter-repo (pip install git-filter-repo). Aborting."; exit 1 }
    pip install git-filter-repo
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install git-filter-repo. Install it manually and re-run this script."; exit 1 }
}

# Build paths list to remove
$pathsToRemove = @('_site','vendor')
if ($ExtraPaths) { $pathsToRemove += $ExtraPaths }

Write-Host "Paths to remove from history:" ($pathsToRemove -join ", ") -ForegroundColor Cyan
if ($DryRun) { Write-Host "Dry run requested — performing no destructive actions."; exit 0 }

Write-Host "Running git-filter-repo to remove specified paths from history..."
# Use --invert-paths to remove the listed paths. Build args robustly for PowerShell.
$args = @('--invert-paths')
foreach ($p in $pathsToRemove) {
    $args += '--path'
    $args += $p
}
Write-Host "Executing: git filter-repo $($args -join ' ')"
& git filter-repo @args
if ($LASTEXITCODE -ne 0) { Write-Error "git-filter-repo failed. See output above."; exit 1 }

Write-Host "Expiring reflog and running garbage collection..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

if ($AutoPush) {
    Write-Warning "AutoPush enabled. This will force-push rewritten history to origin and tags. Ensure collaborators are ready."
    git push --force --all
    git push --force --tags
    Write-Host "Force-pushed rewritten history to origin."
} else {
    Write-Host "History rewritten locally. To publish changes, run the following commands after reviewing the repo:"
    Write-Host "```powershell"
    Write-Host "git push --force --all"
    Write-Host "git push --force --tags"
    Write-Host "```"
}

Write-Host "Done. A bare mirror backup is at: $backupDir.git"