---
layout: page
title: Off-Nav
description: Data annotator to create ground truth dataset for off-road navigation
img: assets/img/p3_1.jpg
importance: 3
category: work
---

The GUI provides an interactive interface for superpixel generation and labeling. Users can open images, generate superpixels, assign labels to superpixels, and save the labeled images.

Our GUI allows users to input a folder containing images. Once the folder is selected, the gui retrieves the paths of the images within that folder. Users can then adjust the parameters for superpixel generation, such as compactness and the number of superpixels. Clicking the "Generate Superpixels" button triggers the generate_superpixels function, which uses the SLIC algorithm to generate superpixels based on the selected parameters. The resulting superpixels are displayed in the GUI. Users can then select a label and assign it to a superpixel by clicking on it. The assigned label is visually highlighted in the displayed image. Once all superpixels are labeled, users can save the original image, the image with labeled superpixels, and the corresponding grayscale image with labeled segments. These images are saved in separate folders. The approach provides a convenient and interactive way for users to generate superpixels and label them in a batch processing manner.


The Demo:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/p3.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>


