---
title: Donut Progress Bar in CSS and JavaScript
date: 2018-01-21
abstract: How to create a circular progress bar with an image inside.
tags: CSS,JavaScript,HTML,web development
---

This is my first blog post! It's not going to be a real blog post but more of a small web development demo about something I did for my team at work. If you are only here to see the HTML, JavaScript and CSS code, simply scroll down to the end.

As many other companies, my work place is trying to adopt the DevOps culture and to integrate developers to the software deployment and monitoring process. As my team was taking more of those kind of responsibilities, I was getting frustrated with how many alarm notifications we had to deal with in our Slack channel. Most of them were false alarms or not worth reporting. So I had the idea of creating a dashboard showing when our alarms last fired. I created an overall metric for how much time passed with no alarm notifications. I promised to buy a box of donuts if we ever reach 10 days with no alarms. This turned out to be much more effective than I thought it would be! My team started caring about tuning and developing more appropriate alarms. A nice way to gamify the system. Long live the doughnuts!

<script async src="//jsfiddle.net/zommerfelds/71jLd73v/embed/result/"></script>


I created a progress indicator of how far we were from the box of doughnuts. I'm not usually a front-end developer, but I wanted to refresh my CSS skills. Below is the result and the code for it. There is no easy way to draw or cut out a circle cross section in CSS, so the way I implemented the doughnut was by drawing two halves of the doughnut separately and then drawing a white gradient on top. The gradient is calculated in JavaScript. I hope it will be useful for someone out there!

<script async src="//jsfiddle.net/zommerfelds/71jLd73v/embed/css/"></script>
<script async src="//jsfiddle.net/zommerfelds/71jLd73v/embed/html/"></script>
<script async src="//jsfiddle.net/zommerfelds/71jLd73v/embed/js/"></script>
