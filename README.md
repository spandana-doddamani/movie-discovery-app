# 🎬 Movie Discovery App

A full-stack movie discovery application that allows users to search for movies, view movie details, and manage a personal wishlist. The application uses the TMDB API to fetch movie data and provides a responsive React-based interface with a Node.js/Express backend and SQLite database.

## 🚀 Features

* 🔍 Search movies using the TMDB API
* 🎞️ Display movie posters, titles, ratings, release dates, and overview
* ❤️ Add movies to a personal wishlist
* 🗑️ Remove movies from the wishlist
* 💾 Store wishlist data using SQLite
* 🔗 REST API integration between frontend and backend
* 📱 Responsive and user-friendly interface
* ⚡ Loading and error handling

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* SQLite

### External API

* TMDB (The Movie Database) API

## 📂 Project Structure

movie-discovery-app/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── routes/
│   ├── database/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/spandana-doddamani/movie-discovery-app.git
cd movie-discovery-app
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
```

Replace `your_tmdb_api_key` with your TMDB API key.

### 5. Start the backend

```bash
cd server
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Start the frontend

In another terminal:

```bash
cd client
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

## 🔌 API Functionality

The backend handles communication between the React frontend, TMDB API, and SQLite database.

Example functionality:

```text
React Frontend
      ↓
Node.js + Express Backend
      ↓
TMDB API → Movie Data
      ↓
SQLite → Wishlist Data
```

## 📸 Application Workflow

1. Search for a movie.
2. Browse the available movie results.
3. View movie information and poster.
4. Add a movie to the wishlist.
5. View saved wishlist movies.
6. Remove movies when no longer needed.

## 🔐 Environment Variables

For security, API keys and sensitive configuration should not be committed to GitHub.

Make sure `.env` is included in `.gitignore`:

```text
.env
node_modules/
*.db
```

## 🎯 Learning Outcomes

This project helped me gain practical experience with:

* Full-stack application development
* React.js frontend development
* Node.js and Express.js backend development
* REST API integration
* Third-party API consumption
* SQLite database operations
* Frontend-backend communication
* Git and GitHub
* Error handling and debugging

## 🔮 Future Improvements

* User authentication
* Movie genres and advanced filtering
* Pagination
* Movie trailers
* Personalized recommendations
* Persistent user accounts
* Deployment with a production database
* 
