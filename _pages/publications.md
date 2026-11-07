---
layout: page
permalink: /publications/
title: publications
description: Accepted papers and arXiv preprints.
nav: true
nav_order: 2
---

<div class="publications academic-research">

<h2>Accepted papers</h2>
{% bibliography --template research --group_by none --query @*[status=accepted]* %}

<h2>Preprints</h2>
{% bibliography --template research --group_by none --query @*[status=preprint]* %}

<h2>Magazine articles</h2>
{% bibliography --template research --group_by none --query @*[status=magazine]* %}

</div>
