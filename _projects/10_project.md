---
layout: page
title: Off_Terrain 
description: Path Planning on Offroad Terrain Simulator
img: assets/img/p10.jpg
importance: 8
category: work
giscus_comments: false
---

##### (This is work in progress)


Most of the work in autonomous navigation in offroad terrain involves thoeretical novelties without any proper hardware setup. Only some labs have access to hardware setup but that means they would have to test their algorithms on hardware again and again without any safety guarantees. This could be prevented by using simulation but there is no offroad environment in any simulation software.

TO solve this, I have tried to come up with offroad simulation environments for testing and validating path planning and RL algorithms. For this, I have tried multiple open source terrains but could only use one. *All these environments are made for Gazebo(& ROS) so that it is easy to implement the methods in hardware from simulation.*



<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/off.mp4" class="img-fluid rounded z-depth-1" controls=true %}
    </div>
</div>







Now, this is a good environment but it also has some downsides. So I have made one of my own environments for my usecase.










# my env
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/off1.mp4" class="img-fluid rounded z-depth-1" controls=true %}
    </div>
</div>

This is just one of the prototype I built and I will be making more diverse terrains and then integrate it to some of the path planning and RL methods I have been implementing. Do let me know if anyone has any suggestions or something. 
