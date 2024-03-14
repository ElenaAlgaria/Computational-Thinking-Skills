# IP5_CTSkills

## Name

23HS_IMVS29: CTSkills: Eine Web-App für den Programmierunterricht an Schulen

## Getting started

The entry point to the application is the Index file via [ip5_ctskills](https://zoe.vocat.pages.fhnw.ch/ip5_ctskills/).
The Navigation will take over from there.
To open the website ignore the security warning and click on "Erweitert" and then accept to open the website.

## Structure

All Files are sorted after their file type. So there are CSS, HTML, JS and Resources folders.

## Software Architecture

This image describes the most important connections between HTMLs und JSs.

| ![IMAGE_DESCRIPTION](/resources/images/ImageReadMe3.png) |
|:--------------------------------------------------------:|
|                       Architecture                       |

## Description

We have developed a web application with which the students decomposition skills can be measured using various tasks.
The tasks are aimed at the target group, primary school students from grades 1 to 6.
We save the data it includes the answers to the questions asked as well as personal information, in particular name,
class and age.
Our web application is designed as an interactive game. Three different game scenes with increasing difficulty,
hereinafter referred to as levels, are played. These game scenes form the basis for the students to be able to answer
questions about the game. These questions are designed to measure decomposition skills.
We developed this concept as an apple game. The game scenes each show a tree with apples
and a basket. This is the starting point and the task is to collect all the apples in the basket. In the first two
levels, all apples are pulled into the basket one by one, while in the third level apples fall from top to bottom and
are caught in the basket, which can be moved back and forth. To promote pattern recognition, this drag and drop function
runs throughout the entire game. We implemented the web application with JavaScript, HTML and CSS. We were able to
implement this drag function using Draggable() from the GSAP JavaScript library.

## Test

To start the tests go to resources/test/. Choose the test that you want to start. Make a right click on the file and
choose "Run 'XYTest.html'".

## Visuals

| ![IMAGE_DESCRIPTION](/resources/images/ImageReadMe.png) |
|:-------------------------------------------------------:|
|                        *Level 1*                        |

| ![IMAGE_DESCRIPTION](/resources/images/ImageReadMe2.png) |
|:--------------------------------------------------------:|
|                       *Question 1*                       |

## Authors

Elena Algaria & Zoe Vocat


