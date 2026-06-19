# NoteSphere - Full Stack Note App

NoteSphere is a personal note-making application built with HTML, CSS, JavaScript, Node.js, Express, MongoDB, and JWT authentication. Users can create an account, log in, and manage their own private notes in a clean dashboard.

## Project Description

The goal of this project is to help users organize daily ideas, study notes, reminders, and small task lists. The front end communicates with the Express API using the Fetch API, and the backend protects private routes using JSON Web Tokens.

## Main Features

- User registration and login
- Password hashing with bcryptjs
- JWT protected note routes
- Private notes for each logged-in user
- Create, read, update, and delete notes
- Search notes by title or content
- Sort notes by newest, oldest, title, or pinned notes
- Pin important notes using local storage
- Copy a note to the clipboard
- Word and character counter while writing
- Writing tools for bullet lists, numbered lists, task lines, and a quick note template
- Separate task checklist saved in local storage
- Font selector saved in local storage
- Responsive warm-toned user interface
- Basic server-side validation and error handling

## Technologies Used

### Front End

- HTML5
- CSS3
- JavaScript
- Fetch API
- Local Storage

### Back End

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- dotenv
- cors

## Folder Structure

```text
Note-Sphere/
├── backend/
│   ├── controllers/
│   │   ├── authHandler.js
│   │   └── noteHandler.js
│   ├── db/
│   │   └── connection.js
│   ├── middleware/
│   │   ├── errorManager.js
│   │   └── verifyUser.js
│   ├── models/
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── noteRouter.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── account.js
│   ├── guide.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── style.css
│   └── workspace.js
└── README.md
```

## How to Run the Project



### 1. Install backend packages

```bash
cd backend
npm install
```




### 2. Start MongoDB

Make sure MongoDB is running on your computer before starting the backend server.

### 3. Before running the application

create a .env file inside the backend folder and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

Example
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notesphere
JWT_SECRET=mysecretkey123

### Replace the following values with your own:

username → MongoDB Atlas username
password → MongoDB Atlas password
cluster0.xxxxx.mongodb.net → Your MongoDB Atlas cluster URL
JWT_SECRET → Any secure secret key of your choice

### 4. Start the backend server

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 4. Open the frontend

Open the frontend folder in VS Code and run `register.html` or `login.html` using Live Server.

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Notes

```http
GET /api/notes
POST /api/notes
PUT /api/notes/:id
DELETE /api/notes/:id
```




## Learning Reflection

While building this project, I practiced connecting a front-end interface with a backend REST API. I also learned how authentication works with JWT, how passwords can be protected with hashing, and how private notes can be connected to a specific user. On the front end, I practiced DOM manipulation, form validation, searching, sorting, local storage, and responsive CSS design.

## Future Improvements

- Add note categories
- Add due dates for tasks
- Add dark mode
- Add note sharing
- Deploy the frontend and backend online




# Note-Sphere Project Summary

## Project Overview

The Note-Sphere project is a full-stack note management application designed to help users create, view, update, and delete notes efficiently. The application was developed using modern web development technologies and follows the CRUD (Create, Read, Update, Delete) model. The primary goal of this project was to gain hands-on experience in backend development, database integration, API creation, and full-stack application development while applying concepts learned throughout the bootcamp.

## Key Accomplishments

* Successfully designed and developed a full-stack note-taking application.
* Implemented complete CRUD functionality allowing users to create, read, update, and delete notes.
* Built RESTful API endpoints using Node.js and Express.js.
* Connected the application to a database for persistent data storage.
* Integrated frontend and backend components to provide a seamless user experience.
* Implemented routing and request handling using Express.js.
* Tested API endpoints to ensure proper functionality and data accuracy.
* Utilized Git and GitHub for version control and project management.
* Organized project structure following industry-standard development practices.
* Improved understanding of client-server architecture and data flow between frontend and backend systems.
* Successfully deployed and shared the project using modern deployment tools.

## Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* MongoDB
* Git
* GitHub
* REST APIs

## Challenges Faced

### Backend Setup and Configuration

* Understanding how Node.js, Express.js, and the database interact together was initially challenging.
* Configuring project folders, dependencies, and server setup required additional research and troubleshooting.

### API Development

* Creating RESTful routes and handling different HTTP methods such as GET, POST, PUT, and DELETE required careful implementation.
* Debugging API requests and responses was time-consuming during the development process.

### Database Integration

* Establishing database connections and performing CRUD operations required learning new concepts related to data persistence.
* Managing data validation and handling errors appropriately presented additional challenges.

### Frontend and Backend Communication

* Connecting frontend forms to backend API endpoints required a strong understanding of asynchronous operations and request handling.
* Troubleshooting issues related to data transfer between the client and server was one of the most significant learning experiences.

### Error Handling and Debugging

* Resolving server errors, routing issues, and database connection problems required extensive testing and debugging.
* Learning how to read error messages and systematically identify problems improved overall problem-solving abilities.

### Deployment Challenges

* Deploying the application and configuring environment variables required additional learning beyond local development.
* Ensuring the application worked correctly in both development and production environments required careful testing.

## Learning Outcomes

* Strengthened knowledge of full-stack web development concepts.
* Gained practical experience with backend development using Node.js and Express.js.
* Learned how to build and consume REST APIs.
* Improved understanding of database operations and data management.
* Enhanced debugging and troubleshooting skills.
* Developed confidence in building complete applications from concept to deployment.
* Improved Git and GitHub workflow skills for version control and collaboration.
* Gained valuable experience working with real-world development tools and practices.

## Conclusion

The Note-Sphere project was a valuable learning experience that combined frontend development, backend programming, database management, and deployment into a single application. Through this project, I gained practical experience building a complete full-stack application and developed a deeper understanding of modern web development technologies. Despite various technical challenges, successfully completing the project strengthened my confidence, problem-solving skills, and readiness for future software development opportunities.

## Author

Deepika Sharma
