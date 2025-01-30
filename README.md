# 📚 The Book Heaven - Full Stack Book Recommendation System

Welcome to **The Book Heaven**, a full-stack book recommendation system built with **Next.js** (frontend) and **Express.js** (backend). Users can explore books, read details, add new recommendations, and leave reviews.

## 🚀 Features

- 📖 Browse and search for books by title, author, or genre.
- 📝 View book details, including descriptions and related books.
- ⭐ Add, edit, and delete book reviews with a star rating system.
- ➕ Submit new book recommendations.
- 🔍 Interactive search with auto-suggestions.
- 🎨 Responsive and dark-themed UI with Tailwind CSS.

## 📂 Project Structure

### **Frontend (Next.js)**
[Frontend Repository](https://github.com/zakriakhanx/the-book-heaven-frontend)

```
├── app/
│   ├── ContextAPI/          # Books API Context for state management
│   ├── bookDetailsPage/     # Dynamic book details page
│   │   ├── [id]/            # Individual book page
│   │   │   ├── page.js      # Main details page
│   │   │   ├── components/  # Book details components
│   ├── components/          # UI Components (Navbar, BookGrid, BookCard, etc.)
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.js            # Root layout with Navbar
│   ├── page.js              # Homepage listing all books
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.mjs      # Tailwind CSS configuration
├── next.config.mjs          # Next.js configuration
```

### **Backend (Express.js)**
[Backend Repository](https://github.com/zakriakhanx/the-book-heaven-backend)

```
├── server.js                # Main server file
├── routes/                  # Express API routes
│   ├── books.js             # CRUD operations for books
│   ├── reviews.js           # CRUD operations for reviews
├── models/                  # Mongoose schemas
│   ├── Book.js              # Book schema
│   ├── Review.js            # Review schema
├── config/                  # Database configuration
├── middleware/              # Custom middlewares
├── package.json             # Dependencies and scripts
```

## 🛠️ Technologies Used

### **Frontend**
- **Next.js 15** - Server-side rendering & optimized routing.
- **React 19** - Component-based UI design.
- **Tailwind CSS** - Utility-first styling.
- **Axios** - API requests for fetching book data.
- **Context API** - State management for books and reviews.

### **Backend**
- **Express.js** - Lightweight Node.js framework for REST APIs.
- **MongoDB (Mongoose)** - NoSQL database for storing books and reviews.
- **dotenv** - Environment variable management.
- **CORS & Helmet** - Security enhancements.
- **Multer** - File handling for future enhancements.

## 🏗️ Installation & Setup

### **Frontend**
1. Clone the repository:
   ```sh
   git clone https://github.com/zakriakhanx/the-book-heaven-frontend.git
   cd the-book-heaven-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file and add:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```
4. Run the development server:
   ```sh
   npm run dev
   ```
   Open `http://localhost:3000` to view the app.

### **Backend**
1. Clone the repository:
   ```sh
   git clone https://github.com/zakriakhanx/the-book-heaven-backend.git
   cd the-book-heaven-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
4. Run the backend server:
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:5000/api`.

## 🎯 Usage Guide

- **Home Page:** Displays a list of book recommendations.
- **Search Bar:** Type a book title, author, or genre to find books.
- **Book Details:** Click on a book to view details and related books.
- **Review System:** Add or delete reviews with star ratings.
- **Add New Book:** Submit a book recommendation via the form.

## 📌 TODOs & Future Enhancements

- 📡 Connect to a real book API for broader recommendations.
- 📊 Implement user authentication for personalized suggestions.
- 🌎 Dark/light mode switcher.
- 📚 Bookmark feature for saving favorite books.

## 🤝 Contributing

Want to contribute? Follow these steps:

1. Fork the repo and create a new branch.
2. Make changes and commit.
3. Open a pull request.
