# REST-API 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app with node.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

### `npm run dev`

Runs the app in the development mode with nodemon.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.


## API Routes


### Account Module Routes

- POST /api/accounts/signup - *Signup User*
- POST /api/accounts/login - *Login User*
- GET /api/accounts/profile- *Get profile*
- PATCH /api/accounts/profile - *Perform updates on profile*
- DELETE /api/accounts/delete - *Delete user's profile*

### Event Module Routes

- GET /api/events/viewAllEvents - *Gets Event List of all events*
- GET /api/events/viewAllUsersEvents - *Gets List of LoggedIn user's events*
- GET /api/events/add/ - *Add an Event*
- GET /api/events/update/:eventID- *Update an Event using eventID*
- GET /api/events/delete/:eventID - *Delete an Event using eventID*

#### POSTMAN Collection -
 [Click Here](https://www.getpostman.com/collections/e9275d6615f88e25ae87)
