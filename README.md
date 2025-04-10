# 📚 The Book Heaven - Full Stack Book Recommendation System

Welcome to **The Book Heaven**, a full-stack book recommendation system built with **Next.js** (frontend) and **Express.js** (backend). Users can explore books, read details, add recommendations, manage favorites, leave reviews, and view user profiles.

## 🚀 Features

-   👤 **User Authentication:** Secure Sign-up and Sign-in using JWT.
-   🔐 **Authorization:** Role-based access control (user, admin).
-   📖 **Browse & Search:** Explore books and search by title, author, or genre with auto-suggestions.
-   📝 **Book Details:** View comprehensive book information, including descriptions, author, genre, and who recommended it.
-   ➕ **Recommend Books:** Authenticated users can submit new book recommendations.
-   ✏️ **Manage Recommendations:** Users can edit or delete their own recommendations (Admins can manage all).
-   ⭐ **Review System:** Add, view, edit, and delete book reviews with a star rating system (linked to authenticated users).
-   ❤️ **Favorites:** Authenticated users can add/remove books from their personal favorites list.
-   👤 **User Profiles:**
    -   **Private Profile:** View your own recommended books and favorite books.
    -   **Public Profile:** View books recommended by other users.
-   🛡️ **Security:** Backend protected with CORS, Helmet (implicitly via Express defaults), JWT, password hashing (bcrypt), and Arcjet (Bot Detection, Rate Limiting).
-   🔄 **State Management:** Frontend uses React Context API for managing Books, Authentication, and Favorites state globally.
-   🎨 **UI:** Responsive design using Tailwind CSS with a predefined dark theme.
-   ⏳ **Loading & Error Handling:** User-friendly loading indicators and error boundaries/messages.
-   🔗 **Related Books:** View books related by genre on the book details page.

## 📂 Project Structure

### **Frontend (Next.js)**

[Frontend Repository](https://github.com/zakriakhanx/the-book-heaven-frontend)

./zakriakhanx-the-book-heaven-frontend/
```
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
├── app/
│ ├── globals.css # Global styles with Tailwind CSS variables
│ ├── layout.js # Root layout with Context Providers & ErrorBoundary
│ ├── page.js # Homepage
│ ├── components/ # Reusable UI Components
│ │ ├── BookCard.js # Displays individual book summary
│ │ ├── BookForm.js # Modal form for adding/editing books
│ │ ├── BookGrid.js # Grid layout for displaying BookCards
│ │ ├── BookList.js # Main component for displaying books on homepage
│ │ ├── BookLoading.js # Loading indicator component
│ │ ├── ErrorBoundary.js # Catches React component errors
│ │ ├── Login.js # Login form component
│ │ ├── Modal.js # Reusable modal component
│ │ ├── Navbar.js # Top navigation bar with Search and Auth links
│ │ ├── SearchBar.js # Search input with suggestions dropdown
│ │ └── SignUp.js # Signup form component
│ ├── ContextAPI/ # React Context for Global State Management
│ │ ├── AuthContextApi.js # Manages authentication state (token, user details)
│ │ ├── booksAPI.js # Manages book data fetching and state
│ │ └── FavoriteContext.js # Manages user's favorite books state
│ └── pages/ # Application Pages/Routes
│ ├── bookDetailsPage/ # Book Details Route Group
│ │ └── [id]/ # Dynamic route for individual book details
│ │ ├── page.js # Main component for the book details page
│ │ └── components/ # Components specific to book details
│ │ ├── BookDetails.js # Displays core book info, actions (Edit, Delete, Favorite)
│ │ ├── EditableStarRating.js# Interactive star rating input
│ │ ├── RelatedBooks.js # Displays books with the same genre
│ │ ├── ReviewCard.js # Displays a single review with actions
│ │ └── StarRating.js # Displays a non-interactive star rating
│ ├── login/ # Login Page Route
│ │ └── page.js
│ ├── profile/ # User's Private Profile Page Route
│ │ └── page.js
│ ├── signup/ # Signup Page Route
│ │ └── page.js
│ └── user/ # Public User Profile Route Group
│ └── [username]/ # Dynamic route for public user profiles
│ └── page.js
└── public/ # Static assets
```

### **Backend (Express.js)**

[Backend Repository](https://github.com/zakriakhanx/the-book-heaven-backend)

./zakriakhanx-the-book-heaven-backend/
```
├── README.md
├── package.json
├── server.js # Main Express server setup
├── config/ # Configuration files
│ ├── arcjet.js # Arcjet security configuration
│ ├── db.js # MongoDB connection setup
│ └── env.js # Environment variable loading (dotenv)
├── controllers/ # Request handling logic
│ ├── auth.controller.js # Logic for user signup and signin
│ └── favorite.controller.js # Logic for managing user favorites
├── middleware/ # Express middleware functions
│ ├── arcjet.middleware.js # Arcjet security middleware integration
│ ├── auth.middleware.js # JWT verification and role authorization
│ └── error.middleware.js # Global error handling
├── models/ # Mongoose schemas/models
│ ├── Book.js # Book schema (linked to User)
│ ├── favorite.model.js # Favorite schema (linking User and Book)
│ ├── Review.js # Review schema (linked to User and Book)
│ └── User.js # User schema (with roles)
└── routes/ # API route definitions
├── authRoutes.js # Authentication routes (signup, signin)
├── bookRoutes.js # CRUD operations for books
├── favorites.router.js # CRUD operations for user favorites
└── reviewRoutes.js # CRUD operations for reviews
```

## 🛠️ Technologies Used

### **Frontend**

-   **Next.js 15** - React framework with Server Components, Routing, and optimizations.
-   **React 19** - Library for building user interfaces.
-   **Tailwind CSS** - Utility-first CSS framework for styling.
-   **Axios** - Promise-based HTTP client for making API requests.
-   **React Context API** - For global state management (Authentication, Books, Favorites).
-   **Heroicons** - SVG icons.
-   **Framer Motion** - Animation library (used subtly).
-   **ESLint** - Code linting.

### **Backend**

-   **Express.js** - Web application framework for Node.js (REST APIs).
-   **Node.js** - JavaScript runtime environment.
-   **MongoDB** - NoSQL database for storing data.
-   **Mongoose** - ODM (Object Data Modeling) library for MongoDB.
-   **JWT (jsonwebtoken)** - For generating and verifying authentication tokens.
-   **bcryptjs** - For hashing user passwords securely.
-   **dotenv** - For loading environment variables from a `.env` file.
-   **CORS** - Middleware for enabling Cross-Origin Resource Sharing.
-   **Arcjet** - Security platform (Bot Detection, Rate Limiting).

## 📡 API Endpoints

Base URL: `http://localhost:5000/api` (or your configured backend URL)

### **Authentication API (`/api/auth`)**

| Method | Endpoint    | Description                    | Authorization Required |
| :----- | :---------- | :----------------------------- | :--------------------- |
| POST   | `/sign-up`  | Register a new user            | No                     |
| POST   | `/sign-in`  | Log in an existing user        | No                     |
| GET    | `/users`    | Get all users (Admin/Debug?)   | Yes (Only Admin)       |

### **Books API (`/api`)**

| Method | Endpoint      | Description                     | Authorization Required | Roles Allowed   |
| :----- | :------------ | :------------------------------ | :--------------------- | :-------------- |
| GET    | `/books`      | Get all books                   | No                     | -               |
| GET    | `/books/:id`  | Get a single book by ID         | No                     | -               |
| POST   | `/books`      | Add a new book recommendation   | Yes (Bearer Token)     | `user`, `admin` |
| PUT    | `/books/:id`  | Update a book by ID             | Yes (Bearer Token)     | `user`, `admin` |
| DELETE | `/books/:id`  | Delete a book by ID             | Yes (Bearer Token)     | `user`, `admin` |

*Note: POST/PUT/DELETE operations on books are associated with the authenticated user. Deleting a book also deletes its associated reviews.*

### **Reviews API (`/api`)**

| Method | Endpoint               | Description                  | Authorization Required | Roles Allowed   |
| :----- | :--------------------- | :--------------------------- | :--------------------- | :-------------- |
| GET    | `/books/:id/reviews`   | Get reviews for a book       | No                     | -               |
| POST   | `/books/:id/reviews`   | Add a review to a book       | Yes (Bearer Token)     | `user`, `admin` |
| PUT    | `/reviews/:id`         | Update a review by ID        | Yes (Bearer Token)     | `user`, `admin` |
| DELETE | `/reviews/:id`         | Delete a review by ID        | Yes (Bearer Token)     | `user`, `admin` |

*Note: POST/PUT/DELETE operations on reviews are associated with the authenticated user.*

### **Favorites API (`/api`)**

| Method | Endpoint               | Description                           | Authorization Required | Roles Allowed   |
| :----- | :--------------------- | :------------------------------------ | :--------------------- | :-------------- |
| GET    | `/:userId/favorite`    | Get user's favorite books             | Yes (Bearer Token)     | `user`, `admin` |
| POST   | `/:userId/favorite`    | Add a book to user's favorites        | Yes (Bearer Token)     | `user`, `admin` |
| DELETE | `/:userId/favorite/:bookId` | Remove a book from user's favorites | Yes (Bearer Token)     | `user`, `admin` |

*Note: `:userId` refers to the ID of the authenticated user.*

---

## 🏗️ Installation & Setup

### **Frontend**

1.  Clone the repository:
    ```sh
    git clone https://github.com/zakriakhanx/the-book-heaven-frontend.git
    cd the-book-heaven-frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Set up environment variables:
    *   Create a `.env.local` file in the root and add your backend API URL:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000
        ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
    Open `http://localhost:3000` (or the port specified in your terminal) to view the app.

### **Backend**

1.  Clone the repository:
    ```sh
    git clone https://github.com/zakriakhanx/the-book-heaven-backend.git
    cd the-book-heaven-backend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Set up environment variables:
    *   Create a `.env` file in the root and add the following:
        ```env
        # Server Configuration
        PORT=5000

        # Database Configuration
        DB_URI=your_mongodb_connection_string

        # JWT Configuration
        JWT_SECRET=your_strong_jwt_secret_key
        JWT_EXPIRES_IN=1d # e.g., 1 day, 7d, 1h

        # Arcjet Configuration (Optional - Get keys from arcjet.com)
        ARCJET_KEY=your_arcjet_site_key
        # ARCJET_ENV=development # Optional: set to 'production' in prod
        ```
4.  Run the backend server:
    ```sh
    npm start
    ```
    The API will be available at `http://localhost:5000/api`.

## 🎯 Usage Guide

-   **Home Page:** Browse the list of recommended books.
-   **Search Bar:** Use the search bar in the Navbar to find books by title, author, or genre.
-   **Book Details:** Click on any `BookCard` to view its details, reviews, and related books.
-   **Login/Sign Up:** Create an account or log in using the links in the Navbar to access personalized features.
-   **Recommend a Book:** Once logged in, use the "Add New Book" button (on the homepage) to submit your recommendation.
-   **Reviews:** On a book's detail page, view existing reviews. If logged in, you can add your own review, or edit/delete reviews you've previously submitted.
-   **Favorites:** Logged-in users can click the heart icon on the book details page to add/remove books from their favorites.
-   **Profile:** Access your profile via the Navbar (when logged in) to see your recommended books and your list of favorites. Click "Logout" here to sign out.
-   **Public Profiles:** Click on a username (e.g., "Recommended by [username]") on the book details page to view that user's public profile and their recommendations.

## 📌 TODOs & Future Enhancements

-   📡 Connect to a real book API (like Google Books API) for richer book data and broader recommendations.
-   📄 Implement pagination for book lists and reviews.
-   🎨 Add a Dark/Light mode *switcher*.
-   ⚙️ Admin dashboard for managing users and content.
-   🖼️ Allow image uploads for book covers.
-   ⭐ Improve recommendation logic (e.g., based on user preferences or collaborative filtering).
-   🧪 Add unit and integration tests.

## 🤝 Contributing

Want to contribute? Follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeatureName`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeatureName`).
5.  Open a Pull Request.
