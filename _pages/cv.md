---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

## Profile

Azure AI and Data professional with experience in analytics, machine learning workflows, and cloud-native solution development. Focused on building practical systems that connect data engineering and AI delivery.

## Education

- **B.Sc. in Computer Science and Engineering** - North South University (NSU)

## Experience

### Data Analyst - HeadGear LTD. (Sep 2022 - Jun 2025)
- Built and maintained data preparation workflows
- Performed exploratory data analysis for business reporting
- Developed Tableau dashboards and insight summaries
- Worked with Python, SQL, and cloud-based data tooling

### Junior Software Developer Intern - HeadGear LTD. (May 2022 - Aug 2022)
- Supported API specifications and documentation
- Assisted with web application maintenance
- Contributed to database and integration tasks

## Technical Skills

- **Languages:** Python, SQL, R
- **Data/ML:** scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Spark
- **Pipelines & Orchestration:** Apache Airflow, ETL/ELT
- **Visualization:** Power BI, Tableau, Matplotlib
- **Cloud:** Microsoft Azure, Microsoft Fabric, Azure Cosmos DB
- **Tools:** Git, GitHub, Docker, Kubernetes, Jupyter Notebook

## Projects

<ul>{% for post in site.projects %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

## Achievements

<ul>{% for post in site.achievements %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>
