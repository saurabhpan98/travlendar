# TRAVLENDAR
**A Web app for daily busy travelers** <br/>
**url** - https://travlendarsks.herokuapp.com/

<br/><br/>
## Our team 
- @AshiwalKaran
- @sysachin
- @saurabhpan98

<br/><br/>
## Problem statement
> Many endeavors require scheduling meetings at various locations all across a city, whether in support of a mobile job or a busy parent. The goal of this project is to create a interface that automatically computes and accounts for travel time between appointments to make sure that you're never late for an appointment. Locations of meetings are required to create meetings, and when meetings are created at locations that are unreachable in the allotted time, a warning is created. The application should also suggest travel means. The application should be user customizable (e.g., the user should be able to select preferred (or non-preferred) means of transportation). Additional features could also be envisioned, for instance allowing a user to specify a flexible "lunch". Similarly other types of breaks might be scheduled in a customizable way.

<br/><br/>
## Project description 
 Travlendar will provide flexible and fully-featured web app support that considers the travel time between meetings. Travlendar support a multitude of travel means, including walking, biking, public transportation, and driving. A particular user may choose between each travel means (e.g., a user who does not own a bicycle would choose something else). When a will user interacts with Travlendar, then he/she would be able to:
 
 #### Required features (must)
 1. Create meetings / events at location and time 
 2. View individual events (directions and best route) and check travel time between start and end
 3. View timeline while shows directions and best route for all meetings scheduled today in order 
 4. User would get warning while adding new meetings if clashing with any existing one
 5. Would get warning for unreachable events and of being late
 6. Can select travel mode according to his/her choice 
 
 #### Optional features (included)
 1. Weather support - Can check weather before leaving for any meeting
 2. Would get notified about extra time that can be spent for lunch, rest, etc.
 

<br/><br/>
 ## Tech Used 
  #### Frontend 
  1. HTML 
  2. CSS 
  3. Javascript, jQuery, axios
  4. Framework - Bootstrap
  5. APIs - Google Maps (Places, Directions, Javascript), Openweathermap 

  #### Backend 
  1. NodeJs
  2. Mongodb 
  3. Passport (Local, Google, Github, Facebook), Express, Mongoose, EJS, Bcrypt(Password hashing)


<br/><br/>
## How to run project on local machine?
  First open cmd in your machine and just follow these basic commands - 
  ```
  cd desktop 
  git clone https://github.com/saurabhpan98/travlendar.git
  cd travlendar 
  npm install 
  npm install -g nodemon 
  nodemon app.js 
  ```
  Then open browser and type http://localhost:5000, and it's done. Enjoy travlendar 
