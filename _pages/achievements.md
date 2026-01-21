---
layout: achievements
title: "Achievements"
permalink: /achievements/
author_profile: true
redirect_from:
  - /achievments/
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.achievements reversed %}
  {% include archive-single.html %}
{% endfor %}
