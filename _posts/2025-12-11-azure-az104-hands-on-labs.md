---
layout: single
title: "Azure Hands-On Labs: AZ-104 - Walkthrough Playlist"
date: 2025-12-11 00:00:00 +0000
tags: [azure, az104, hands-on, tutorial, youtube]
excerpt: "My AZ-104 hands-on lab playlist with direct embeds and the exact implementation workflow I used."
---

I built this page to document how I prepared for AZ-104 through practical lab execution.

Playlist: https://www.youtube.com/playlist?list=PL9HBlbKg4DavosJmnJ8UTk4dHxeQbY-3V

## What I cover in these labs

- Virtual networking and intersite connectivity
- Network traffic management patterns
- Azure Storage administration tasks
- Azure Virtual Machines administration tasks

## My implementation workflow

This is the repeatable flow I used across the labs:

- Created isolated resource groups for each scenario
- Built VNets, subnets, and NSG rules
- Tested connectivity, routing, and security behavior
- Configured VNet peering for cross-network communication
- Deployed and validated load-balancing components
- Managed storage accounts, blobs, and access tiers
- Provisioned and administered Windows and Linux VMs
- Attached disks and validated persistence after changes

## Embedded lab walkthroughs

### Lab 5 - Implement Virtual Networking

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/DwN8m58mZ58" title="Lab 5: Implement Virtual Networking" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Focus: VNet design, subnetting, NSGs, and connectivity validation.

### Lab 6 - Implement Intersite Connectivity

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/XD0TMnV2-Yc" title="Lab 6: Implement Intersite Connectivity" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Focus: VNet peering, routing behavior, and cross-network validation.

### Lab 7 - Implement Network Traffic Management

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/9KFuwwX7Y3g" title="Lab 7: Implement Network Traffic Management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Focus: load balancing concepts, backend pools, probes, and traffic validation.

### Lab 8 - Manage Azure Storage

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/1cp5iQddNps" title="Lab 8: Manage Azure Storage" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Focus: storage accounts, blob operations, access tiers, and recovery checks.

### Lab 9 - Manage Virtual Machines

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/inQikpCcrSs" title="Lab 9: Manage Virtual Machines" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Focus: VM deployment, disk operations, and admin workflow via Portal and CLI.

## Lab discipline note

I recommend using a dedicated lab subscription or resource group and cleaning up resources after each session to control cost.
