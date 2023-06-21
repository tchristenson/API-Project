## <h1>Come Together Right Now</h1>

Come Together Right Now is a website clone, inspired by [Meetup](https://www.meetup.com/). Come Together Right Now can be used to create groups, create events, join your favorite groups, and search for groups and events on the platform. Interested parties can sign up to post content at their leisure.

**Live Site: [Come Together Right Now](https://meetup-api-iy6y.onrender.com)**

### How to start the project locally:
1. Clone the project repo into the desired location on your machine (https://github.com/tchristenson/API-Project)
2. Create a **.env** file based on the example with proper settings for your development environment. Review the *aws-s3-pern-demo.md* file to set up your own AWS bucket and user
3. cd into both the backend and frontend directories and run the command below to install all dependencies
      ```bash
      npm install
      ```bash
4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:
      ```bash
    npx dotenv sequelize db:create
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
      ```
5. cd into both the backend and frontend directories and run the command below to start the app
      ```bash
      npm start
      ```
6. Browse the site and enjoy

### Features:

#### Groups
* View all groups
* Create groups
* Update their group's details
* Delete their group

#### Events
* View all events
* Create events
* Update their event's details
* Delete their events

#### Memberships
* Request to join other group's as a member
* Group organizer's can approve other members' requests to join
* Group organizers can update other users' membership statuses
* Group organizers or the users themselves can delete their membership to a group

#### Search
* Search for groups and events

#### AWS
* Upload image files for groups and events

### Splash Page
![Splash Page](/frontend/public/meetup-splash-page.gif)
### Group Page
![Group Page](/frontend/public/meetup-group-page.gif)
### User Profile Page
![User Profile Page](/frontend/public/meetup-user-profile.gif)

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/session | Returns the information about the current user that is logged in. |
| POST | /api/session | Logs in a current user with valid credentials and returns the current user's information. |
| POST | /api/users | Creates a new user, logs them in as the current user, and returns the current user's information. |
| GET | /api/groups | Returns all the groups as objects inside a single array. |
| GET | /api/groups/current | Returns all the groups joined or organized by the current user as objects inside a single array. |
| GET | /api/groups/:groupId | Returns the details of a group specified by its id. |
| POST | /api/groups | Creates and returns a new group. |
| POST | /api/groups/:groupId/images | Create and return a new image for a group specified by id. |
| PUT | /api/groups/:groupId | Updates and returns an existing group. |
| DELETE | /api/groups/:groupId | Deletes an existing group. |
| GET | /api/events | Returns all the events as objects inside a single array. |
| GET | /api/groups/:groupId/events | Returns all the events of a group specified by its id |
| GET | /api/events/:eventId | Returns the details of an event specified by its id. |
| POST | /api/groups/:groupId/events | Creates and returns a new event for a group specified by its id |
| POST | /api/events/:eventId/images | Create and return a new image for an event specified by id. |
| PUT | /api/events/:eventId | Edit and returns an event specified by its id |
| DELETE | /api/events/:eventId | Delete an event specified by its id |
| GET | /api/groups/:groupId/members | Returns the members of a group specified by its id. |
| POST | /api/groups/:groupId/membership | Request a new membership for a group specified by id. |
| PUT | /api/groups/:groupId/members/:memberId | Change the status of a membership for a group specified by id. |
| DELETE | /api/groups/:groupId/members/:memberId | Delete a membership to a group specified by id. |
| DELETE | /api/group-images/:imageId | Delete an existing image for a Group. |
| DELETE | /api/event-images/:imageId | Delete an existing image for an Event. |

### Technologies Used:
* [JavaScript](https://devdocs.io/javascript/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [React](https://react.dev/)
* [Redux](https://redux.js.org/)

### Landing Page
You can access the landing page at the link below. You may create a new user account, or there is a demo user button for you to check out the website.

**Home Page: [Come Together Right Now](https://meetup-api-iy6y.onrender.com)**

### Author
+ [Tommy Christenson](https://github.com/tchristenson)
