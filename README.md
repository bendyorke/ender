Purpose
=====

This is a website for Ender the puppy, a 6 week old siberean husky.  It's meant to be a sandbox app to try my hand at some new technologies, most of all Node.js

Technology
=====
Some of the technologies it uses includes:
- Node.js
- Express
- Amazon-S3
- ImageMagick
- Mongoose/MongoDB
- XHR2
- Jade Templating
- Stylus

Functionality
=====

This application allows photo uploading to Amazon S3 using the Amazon Web Services SDK. Before uploading, it resizes the image to have a width of 1000px. Once uploaded it stores the photo url in mongoose, and can retrieve the images and display them.  It relies on a restful architecture for the creation and retrieval of photos.

Uploading is done drag-and-drop to the main page.  You can drag as many files as needed at one time, and the browser will automatically grab those files and send them to the server to be processed and saved.  Once that is complete, it will append the images to the page.

In the future
=====

I'm still building out the front-end for the project, and the way the viewer actually interacts with the project.  Check back for updates coming soon!
