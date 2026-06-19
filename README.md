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
memo-nest/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── auth.js
│   ├── index.html
│   ├── instructions.html
│   ├── login.html
│   ├── notes.js
│   ├── register.html
│   └── style.css
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

### 3. Start the backend server

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

## Author

Deepika Sharma
