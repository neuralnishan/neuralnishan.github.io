# Scan and Cleanup Helper for secrets in repo
# Usage: run from repository root in PowerShell
# Requires: Git, Docker (optional), or gitleaks installed

function Run-Gitleaks {
    param(
        [string]$ReportPath = "gitleaks-report.json"
    )

    if (Get-Command gitleaks -ErrorAction SilentlyContinue) {
        Write-Host "Running gitleaks (local binary)..."
        gitleaks detect --source . --report-path $ReportPath
    } elseif (Get-Command docker -ErrorAction SilentlyContinue) {
        Write-Host "gitleaks not found locally; running via Docker..."
        docker run --rm -v ${PWD}:/repo zricethezav/gitleaks:latest detect --source /repo --report-format json --report-path /repo/$ReportPath
    } else {
        Write-Warning "gitleaks not installed and Docker not found. Install gitleaks (https://github.com/gitleaks/gitleaks) or Docker to run the scan."
        return
    }

    if (Test-Path $ReportPath) {
        Write-Host "gitleaks report written to $ReportPath"
    } else {
        Write-Warning "gitleaks did not produce a report file. Check output above for details."
    }
}

function Suggest-Cleanup {
    Write-Host "\nIf the scan finds secrets, follow these steps (summary):\n"
    Write-Host "1) Rotate the leaked secrets immediately (API keys, tokens, certificates) on the provider side."
    Write-Host "2) Remove the leaked files from the repo and purge history (git-filter-repo or BFG)."
    Write-Host "3) Force-push the cleaned history (coordinate with collaborators).\n"

    Write-Host "Commands to remove build/vendor from the repository index (safe, non-destructive):"
    Write-Host "```powershell"
    Write-Host "git rm -r --cached _site" 
    Write-Host "git rm -r --cached vendor" 
    Write-Host "git commit -m \"Remove build/vendor directories from repo; add to .gitignore\""
    Write-Host "git push origin HEAD"
    Write-Host "```\n"

    Write-Host "If you need to remove a specific file from history using git-filter-repo (recommended):"
    Write-Host "```powershell"
    Write-Host "pip install git-filter-repo" 
    Write-Host "# Example: remove secrets.yml from all history"
    Write-Host "git filter-repo --invert-paths --paths secrets.yml"
    Write-Host "git reflog expire --expire=now --all"
    Write-Host "git gc --prune=now --aggressive"
    Write-Host "git push --force --all"
    Write-Host "git push --force --tags"
    Write-Host "```\n"

    Write-Host "Alternative using the BFG Repo-Cleaner (simpler for common patterns):"
    Write-Host "```powershell"
    Write-Host "# Download bfg.jar, then:
java -jar bfg.jar --delete-files secrets.yml
# Or replace secrets by pattern
java -jar bfg.jar --replace-text passwords.txt
# Finalize cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
"
    Write-Host "```\n"

    Write-Host "Important: Rewriting history is disruptive. Rotate secrets first and notify collaborators before force-pushing."
}

# Main
Write-Host "Running repo secret scan helper...\n"

if (-not (Test-Path ".git")) {
    Write-Warning ".git directory not found in this workspace. Please run this script from your repository root where .git exists."
    exit 1
}

Run-Gitleaks
Suggest-Cleanup

Write-Host "\nDone. Inspect the gitleaks report and act on any findings."