# Reservation-System

## Introduction

Application built in React.

## Getting started
1. Clone this repository or download zip of it.
2. Folder Structure ```Reservation-System -> backend, frontend```

## Changes in API

Commented line 67 in server.js
```date = moment.unix(date).tz(locale).startOf('day').unix();```

This is because this line would generate a Unix timestamp for the start of the day but initial data provided was saved at a different time (11 AM). So, in order to perform delete on that data, I commented out this line.

## Run the application

You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

### Setting up Backend

* In the terminal, navigate to 'backend' folder
* Install the dependencies ```npm install```
* Start the backend server: ```npm start```

Backend has been setup! 

API would be running at [localhost:3000](http://localhost:3000)

### Setting up Frontend

* In the terminal, navigate to 'frontend' folder
* Install the dependencies ```npm install``` or ```yarn install```
* Start the frontend development server: ```npm run start```  or ```yarn start```

Frontend has been setup!

Application is now running at [localhost:8080](http://localhost:8080). 

#### Tested on Google Chrome.
