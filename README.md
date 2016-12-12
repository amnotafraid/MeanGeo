#MeanSeed

While I was learning the MEAN stack, I worked through several tutorials. One tutorial that formed the basis for my development was [this one](https://www.gitbook.com/book/amnotafraid/i-mean-it/edit#) by J. Cole Morrison. He separated the client part, or the Angular part, from the server part, or the Node and Express part.

Some version info:

```
node -v
v6.0.0
```
I
f you have Node, Mongo, Bower, Compass, and Git installed on a Mac OSX computer, you can deploy the MeanSeed application as follows. These directions should work for a Windows environment with some modifications.

First, clone the MeanSeed code. In the directory where you want the root, do a git clone. It will create a MeanSeed directory and get all the code inside that directory:
```
git clone https://github.com/amnotafraid/MeanSeed.git
```
In the MeanSeed directory, you want a directory structure for your data that looks like this:
```
└─data
     ├── db
     └── logs
```
You can get that by going inside the MeanSeed directory and typing:
```
mkdir -p data/db && mkdir data/logs
```
In the MeanSeed/client directory, install the software needed like this:
```
npm install
bower install jquery
```
In the MeanSeed/server directory:
```
npm install
```
In the MeanSeed directory, start mongo with the following command:
```
mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend
```
Start the software in the client directory, MeanSeed/client:
```
grunt serve
```
This should open a browser at localhost:9000, but you can close it because you don't need it. 
Start the software in the server directory, MeanSeed/server:
```
npm test
```
Open up a browser at http://localhost:3000. You should see your app:
![Screen Shot](file:///Users/razoyo-dev/Downloads/MeanSeed%20Front%20Page.png)

