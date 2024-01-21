---
layout: page
title: Astar on Graph
description: implementing a star algorithm for navigation in 10*10 array
img: assets/img/p6_1.jpg
importance: 3
category: fun
---


## Tech Stack

- Python
- Numpy



# Theory and Approach

### A* Implementation
I have implemented the A* algorithm for pathfinding in a 10x10 map. A* evaluates nodes based on a combination of the cost to reach the node from the start and a heuristic estimate of the remaining cost to reach the goal. By considering both the actual cost and the estimated cost, A* efficiently searches the graph, prioritizing nodes that are more likely to lead to the optimal path. This was visualized using matplotlib.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p3_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

