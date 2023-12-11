# Song List

This website is inspired by a rhythm game. Created with React. The main purpose of this website is to practice coding and self-use.

## About Database and Backend
For some data, I find that it is more convenient to store in a database instead within the frontend with an object, so chose to store in Firebase Firestore because it does not need a backend.
However, there are some limitation with Firestore (such as only 50000 reads per day), so I chose to use MongoDB.
As MongoDB need a backend to get the data, so I created a backend application with Node.js and do fetching in React.

## How the database works

# song
_id is the unique identifier for a song
- To access common attributes such as thumbnail and title

chartLevels.id is a unique identifier for the chart
- To access the chart's difficulty, chart type and level
- Version released should be accessed here because there are different chart types for one song
- e.g. Selector (ST) => Murasaki and Selector (DX) => Festival+

charts 
- id
- title

chartLevels
- _id 
- chart_id (id from charts) 
- chart => d or s
- difficulty => Expert, Master, Re:Master
- level => XX.XX e.g. 14.8
- version => e.g. Festival+
- version_released => e.g. Festival+

thumbnail 
- Get thumbnail by id

