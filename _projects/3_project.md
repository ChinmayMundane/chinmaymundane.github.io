---
layout: page
title: Off-Nav 
description: Data annotator for off-road navigation
img: assets/img/p3_1.jpg
importance: 3
category: work
---

# IISER Bhopal Research Internship 

# Table of contents
- [About the Project](#about-the-project)
  - [Tech Stack](#tech-stack)
  - [File Structure](#file-structure)
- [Theory and Approach](#theory-and-approach)
-  [Flowchart](#flowchart)
-  [GUI Demo](#gui-demo)
-  [Contributor](#contributor)
-  [Acknowledgements](#acknowledgements)


# About the Project

The project was divided into two tasks :
1. Implementing Astar algorithm on 10 cross 10 array 
2. Create a gui interface to annotate and label images for ground truth

## Tech Stack

- Python
- tkinter
- PIL
- skimage
- Numpy
- os

## File Structure

```
.📦
├── 📂assets	                 # contains images and video for readme		
│   ├── 📜images
|   ├── 📜result.mp4
├── 📂 Astar algo               # contains code of astar algorithm and the output of map and path array
|   ├── 📜astar.py
|   ├── 📜map.png
|   ├── 📜path.png
├── 📂color_labels              # will be generated after code execution and will contain segmented labelled image 
├── 📜gui.py                    # module to run gui
├── 📂images                    # will be generated after code execution and will contain original image saved from dataset
├── 📂labels                    # will be generated after code execution and will contain raw data image
├──📜README.md		         # Project readme
├── 📂research papers                          
|   ├── 📜CAMEL.pdf
|   ├── 📜offseg.pdf
|   ├── 📜SuperLabel.pdf
|   ├── 📜Superpixels.pdf
└──📜Sample_dataset		 # contain dataset images

```
# Theory and Approach

### A* Implementation
I have implemented the A* algorithm for pathfinding in a 10x10 map. A* evaluates nodes based on a combination of the cost to reach the node from the start and a heuristic estimate of the remaining cost to reach the goal. By considering both the actual cost and the estimated cost, A* efficiently searches the graph, prioritizing nodes that are more likely to lead to the optimal path. This was visualized using matplotlib.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/p3_2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### GUI
the GUI provides an interactive interface for superpixel generation and labeling. Users can open images, generate superpixels, assign labels to superpixels, and save the labeled images.

Our GUI allows users to input a folder containing images. Once the folder is selected, the gui retrieves the paths of the images within that folder. Users can then adjust the parameters for superpixel generation, such as compactness and the number of superpixels. Clicking the "Generate Superpixels" button triggers the generate_superpixels function, which uses the SLIC algorithm to generate superpixels based on the selected parameters. The resulting superpixels are displayed in the GUI. Users can then select a label and assign it to a superpixel by clicking on it. The assigned label is visually highlighted in the displayed image. Once all superpixels are labeled, users can save the original image, the image with labeled superpixels, and the corresponding grayscale image with labeled segments. These images are saved in separate folders. The approach provides a convenient and interactive way for users to generate superpixels and label them in a batch processing manner.






# GUI Demo

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.html path="assets/video/p3.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>

</div>

