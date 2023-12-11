# Song List

This website is inspired by a rhythm game. Created with React. The main purpose of this website is to practice coding and self-use.

How the database works

id is the unique identifier for a song
- To access common attributes such as thumbnail and title

chartLevels.id is a unique identifier for the chart
- To access the chart's difficulty, chart type and level
- Version released should be accessed here because there are different chart types for one song
- e.g. Selector (ST) => Murasaki and Selector (DX) => Festival+

charts 
- id
- title

chartLevels
- id 
- chart_id (id from charts) 
- chart type => d or s
- difficulty => Expert, Master, Re:Master
- level => XX.XX e.g. 14.8
- version => e.g. Festival+
- version_released => e.g. Festival+

thumbnail 
- Get thumbnail by id

Draft

Song
- title
- category (G&V, maimai, etc)
- difficulty + level (Expert, Master, Re:Master)
- Update name
- version
- Obtain (task track, check-in, play chunithm, otomodachi)
- Update Type: Event/Maimai/Song-only/Season/Check-in

Theoretical Calculator

Choose version 
(only design for completed version, so the structure can be simplier)
Fes+

New songs

Old songs

Structure
{
xx.x: quantity,
yy.y: quantity,
zz.z: quantity
}

Algorithms
- Calculate score for song level
- Add best 15 and best 35
- include song range

title
id
level in different versions
version released





