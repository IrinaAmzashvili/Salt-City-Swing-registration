# Salt City Swing - Registration

<!-- *By Irina Amzashvili - [Visit Salt City Swing - Registration](https://saltcityswing-registration.herokuapp.com/)* -->

*[Wiki Pages](https://github.com/IrinaAmzashvili/react-solo-project/wiki)*

**Table of Contents**
- [Summary](#Summary)
- [Structure Overview](#Structure-Overview)
- [Primary Features](#Primary-Features)
- [Conclusion and Next Steps](#Conclusion-and-Next-Steps)

## Summary

Salt City Swing - Registration is an app where users can discover and register for local dance classes hosted by the existing non-profit organization, Salt City Swing. This app was built using React, Redux, Express, and Sequelize. Users may:

- Create an account
- Log in and Log out
- Log in as a guest via Demo User option
- Discover upcoming Swing dance classes they could register for
- Navigate to the home page to view all available, upcoming classes
- Like and unlike individual classes
- Navigate to a single class page to view class description and information
- Register for a class
- Navigate to the "My Classes" page to view all purchased and liked classes
- Navigate to the "Account" page to update their personal account information
- Users with super user authorization may create, update, and delete classes

## Structure Overview
### Backend
The backend of this app was built using Javascript and Express while utilizing sequelize to interact with a postgreSQL database. The ReSTful convention was followed in all backend API routes.

#### Libraries and Technologies Used
- bcryptjs - password hashing
- cookie-parser - parsing cookies from requests
- cors - CORS
- csurf - CSRF protection
- dotenv - load environment variables into Node.js from a .env file
- express - Express
- express-async-handler - handling async route handlers
- express-validator - validation of request bodies
- faker - random seeding library
- helmet - security middleware
- jsonwebtoken - JWT
- morgan - logging information about server requests/responses
- per-env - use environment variables for starting app differently
- pg@">=8.4.1" - PostgresQL greater or equal to version 8.4.1
- sequelize@5 - Sequelize
- sequelize-cli@5 - use sequelize in the command line
- AWS - allowing scalability and improved speed

- dev-dependencies:
    - dotenv-cli - use dotenv in the command line
    - nodemon - hot reload server backend files

### Frontend
The frontend of this app was built using React and Redux. React allows for quick rerendering without requiring pages to refresh and Redux
manages the application's state.

#### Libraries and Technologies Used
- js-cookie - extracts cookies
- react-redux - React components and hooks for Redux
- react-router-dom - routing for React
- redux - Redux
- redux-thunk - add Redux thunk
- [react-datepicker](https://www.npmjs.com/package/react-datepicker)
- dev-dependencies:
    - redux-logger - log Redux actions in the browser's dev tools console

## Primary Features
### User Login and Sign Up

User authentication is handled using Express-Validator as well as BCryptjs for password hashing. When users provide a password at Login, the password is rehashed and checked against the hashed password in the database. When users create an account, the password hashes are saved to the database in lieu of the user passwords.

### Home Page
The home page displays all available and upcoming classes that the user may like and/or register for. The user may filter the view by class level.

![Home Page](https://user-images.githubusercontent.com/79552414/123537051-d8a02f80-d6ea-11eb-9561-0231edcb8355.png)

### Individual Class Page
By clicking on a class card on the home page, the user will be directed to the page displaying that specific class along with the class description and any information.

![Class Page](https://user-images.githubusercontent.com/79552414/123537082-f8375800-d6ea-11eb-82af-6e0f630abe50.png)

### Registration
The user may register for a class via the "Register" button found on the individial class page. Upon clicking the button, a registration modal will pop up where the user can specify the amount of tickets they would like and proceed with purchasing them. If the user is not logged in, they will be prompted to log in via a modal. Upon successful login, the register modal will pop up so the user may commence with the registration process.

![Registration Modal](https://user-images.githubusercontent.com/79552414/123537102-100edc00-d6eb-11eb-8a00-0b9e3ce0e3eb.png)

### Likes
A logged in user may like or unlike any class. The "like button" feature is a separate React component that appears when a user is logged in.

![Like feature code](https://user-images.githubusercontent.com/79552414/132736778-464b5840-08d1-4afc-bcd0-5e5a2a1cd366.png)

![Home - like](https://user-images.githubusercontent.com/79552414/123537137-2f0d6e00-d6eb-11eb-8ffb-1fccc6630975.png)
![Class - like](https://user-images.githubusercontent.com/79552414/123537170-52381d80-d6eb-11eb-81ec-5c6619880ed9.png)
![My Classes - like](https://user-images.githubusercontent.com/79552414/123537193-6e3bbf00-d6eb-11eb-9d1b-cf9ec23fb58f.png)

### My Classes Page
The "My Classes" page displays all of a logged in user's liked and purchased classes. The user may choose which list to view by clicking the corresponding button at the top of the page. When the "Likes" list is displayed, the class cards have the Register and like buttons included so the user may choose to unlike or register for any class from that list.

![My Classes - likes](https://user-images.githubusercontent.com/79552414/123537274-d12d5600-d6eb-11eb-9b60-26147560a10c.png)

### Account Settings Page
Upon navigation to the "Account Settings" page, the user may choose to update any of their account information or to delete their account entirely.

![image](https://user-images.githubusercontent.com/79552414/123587416-7a835300-d7a3-11eb-9abf-934106a6c075.png)
![image](https://user-images.githubusercontent.com/79552414/123587477-97b82180-d7a3-11eb-9104-69eff4d0856b.png)
![image](https://user-images.githubusercontent.com/79552414/123587534-a999c480-d7a3-11eb-9037-a1b6017afc86.png)

## Conclusion and Next Steps
As my first solo project, this was a fun change of pace for me. I especially enjoyed being completely in charge of all decision making and implementations. I encountered many road blocks along the way, but ultimately it was a very rewarding experience. If I had a change to do it all over again, I would like to modularize the larger react components by breaking them up into smaller pieces.

**Next Steps:** This website is fully intended to be used by the non-profit, Salt City Swing. In order to be production ready, I intend to implement the following features:
- payment system using stripe or paypal libraries / APIs
- user vaccine card images uploaded to profile
- ability for super user to access mailing list emails
