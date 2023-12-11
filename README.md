# Song List

This website is inspired by a rhythm game. Created with React. The main purpose of this website is to practice coding and self-use.

## About Database and Backend
For some data, I find that it is more convenient to store in a database instead within the frontend with an object, so chose to store in Firebase Firestore because it does not need a backend.
However, there are some limitation with Firestore (such as only 50000 reads per day), so I chose to use MongoDB.
As MongoDB need a backend to get the data, so I created a backend application with Node.js and do fetching in React.

## How the database works
Each represents a collection in a database

### song
It contains title and _id
_id is the unique identifier for a song
- To access common attributes such as thumbnail and title

### version
Version has a collection of all charts within the version.
It contains _id, version_released, chart_id, level, chart and youtube

- _id (string) - an unique identifier for the chart
- level (array of doubles) - an array with a length of 5 (Basic, Advanced, Expert, Master, Re:Master), e.g. 14.8
- chart (string) - represents different chart types, it includes standard (s) and deluxe (d)
- version_released (string) - represents which version the chart is released and it may do further filtering in web pages
- youtube is an array of urls (length of 5) for charts that is available on youtube
- chart_id represents the _id of the song (a song can have 2 charts which includes standard and deluxe chart)

### thumbnail 
- Get thumbnail by song._id

