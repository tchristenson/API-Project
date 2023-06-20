## <h1>Come Together Right Now</h1>

Come Together Right Now is a website clone, inspired by [Youtube](https://www.youtube.com/). Come Together Right Now can be used to post videos, comment on videos, create playlists of your favorite videos, like videos, and subscribe to other users on the platform. Interested parties can sign up to post content at their leisure.

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
* [ ]

#### Events
* [ ]

#### Memberships
* [ ]

#### Search
* [ ]

#### AWS
* [ ]

### Splash Page
![Splash Page](/frontend/public/meetup-splash-page.gif)
### Group Page
![Group Page](/frontend/public/meetup-group-page.gif)
### User Profile Page
![User Profile Page](/frontend/public/meetup-user-profile.gif)

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |
| --- | --- | --- |

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
