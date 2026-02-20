---
layout: archive
title: "Academic Projects"
permalink: /projects/
author_profile: true
---

This section highlights selected AI, computer vision, and data-focused projects, including problem context, implementation approach, and demo artifacts.

{% include base_path %}

{% for post in site.projects reversed %}
  {% include archive-single.html %}
{% endfor %}
