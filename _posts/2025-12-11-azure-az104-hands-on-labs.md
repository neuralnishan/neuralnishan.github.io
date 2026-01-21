---
layout: post
title: "Azure Hands-On Labs: AZ-104 — Walkthrough Playlist"
date: 2025-12-11 00:00:00 +0000
tags: [azure, az104, hands-on, tutorial, youtube]
excerpt: "A curated, embedded playlist of hands-on Azure AZ-104 labs from Neural Universe Lab — what's included and what I did step-by-step."
---

**Playlist note:**

The full playlist is available below as individual video embeds. (If you prefer the combined playlist player, open it on YouTube: https://www.youtube.com/playlist?list=PL9HBlbKg4DavosJmnJ8UTk4dHxeQbY-3V)

## Overview

This post embeds the "Azure Hands-On Lab" playlist published on the Neural Universe Lab YouTube channel and summarizes what's included and the hands-on steps I performed while following the series. The playlist is intended as a practical companion to the AZ-104 Microsoft Azure Administrator objectives.

> Note: the playlist is embedded above. If the playlist does not appear due to YouTube restrictions, you can open it directly: https://www.youtube.com/playlist?list=PL9HBlbKg4DavosJmnJ8UTk4dHxeQbY-3V

## What the playlist covers (high-level)

The playlist focuses on the core AZ-104 administrative tasks and typical hands-on labs you would expect when preparing for the Azure Administrator role. Typical topics covered include:

- Managing Azure subscriptions and resources (resource groups, tags, cost-management basics)
- Implementing and managing storage accounts, blobs and file shares
- Creating and configuring virtual machines (Linux/Windows), availability sets and scale sets
- Configuring virtual networks, subnets, network security groups, and peering
- Managing identities: Azure AD users, groups, and role-based access control (RBAC)
- Implementing and managing Azure Monitor, diagnostics, and alerts
- Backup and restore strategies and using Azure Backup
- Managing and configuring Azure Load Balancers and Application Gateways
- Implementing basic automation using ARM templates, CLI, and PowerShell


## What I did (hands-on steps I performed)

Below is a concise summary of the practical tasks I completed while following the labs in this playlist. These are written as actionable steps you can reproduce:

- Provisioned a dedicated resource group to keep the labs isolated.
- Created and configured Storage Accounts; uploaded test blobs and experimented with access tiers.
- Deployed Virtual Machines (Windows and Ubuntu), configured SSH/RDP, and applied OS updates.
- Attached and mounted additional data disks to a VM and validated persistence after reboot.
- Created Virtual Network(s), added subnets, and applied network security groups to enforce inbound/outbound rules.
- Configured private IP addressing and tested connectivity between VMs using ping and network utilities.
- Set up Role-Based Access Control (RBAC) roles for a secondary user to practice least-privilege assignments.
- Enabled diagnostic logging & metrics for VMs and Storage Accounts, then created alerts in Azure Monitor.
- Tested simple automation scripts using the Azure CLI and PowerShell to automate VM start/stop and snapshot creation.
- Implemented a backup policy using Azure Backup and tested restore to ensure reliability.

## What's included in this post

- Embedded YouTube playlist (above).
- High-level summary of topics covered in the playlist.
- Short, reproducible list of hands-on steps I performed while following the lab videos.
- Links and next steps for readers who want to try the labs themselves.

## Suggested next steps for readers

- Clone or create a new Azure subscription (use a free trial or sandbox) and create a resource group for the labs.
- Follow the playlist videos in order — pause frequently and replicate each step in your own subscription.
- Use Azure Cloud Shell or locally installed Azure CLI to run commands shown in the videos.
- Rotate any credentials and clean up resources after completing the labs to avoid unexpected charges.

## Per-video breakdown (Embedded)

Below are the individual videos from the playlist embedded separately with a short note about what each lab covers and the hands-on steps I performed while following it. Visitors can play each video directly on this page.

<!-- Video: Lab 5 -->
### Lab 5 — Implement Virtual Networking

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/DwN8m58mZ58" title="Lab 5: Implement Virtual Networking" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Short summary: configuring Virtual Networks, subnets, route tables, and validating connectivity between VMs. Hands-on steps I ran: created a VNet with multiple subnets, deployed two VMs, tested NSG rules, and verified cross-subnet communication.

<!-- Video: Lab 6 -->
### Lab 6 — Implement Intersite Connectivity

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/XD0TMnV2-Yc" title="Lab 6: Implement Intersite Connectivity" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Short summary: implementing VNet peering and VPN/ExpressRoute style connectivity patterns for hybrid scenarios. Hands-on steps: configured VNet peering, verified routing, and tested site-to-site connectivity scenarios using simulated on-prem endpoints.

<!-- Video: Lab 7 -->
### Lab 7 — Implement Network Traffic Management

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/9KFuwwX7Y3g" title="Lab 7: Implement Network Traffic Management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Short summary: configuring load balancing, traffic manager, and application gateway basics. Hands-on steps: deployed a Load Balancer, created backend pools and health probes, and tested traffic distribution.

<!-- Video: Lab 8 -->
### Lab 8 — Manage Azure Storage

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/1cp5iQddNps" title="Lab 8: Manage Azure Storage" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Short summary: storage account creation, blob/container operations, access tiers, and snapshots. Hands-on steps: created storage accounts, uploaded blobs, experimented with access tiers and lifecycle rules, and validated restores.

<!-- Video: Lab 9 -->
### Lab 9 — Manage Virtual Machines

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/inQikpCcrSs" title="Lab 9: Manage Virtual Machines" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Short summary: VM provisioning, OS images, extensions, and disk management. Hands-on steps: provisioned Windows/Linux VMs, attached data disks, used the Azure portal and CLI to snapshot and resize disks.

