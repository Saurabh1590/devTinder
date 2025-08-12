# DevTinder - Backend ⚙️

![DevTinder Logo](./icon.svg)

This is the backend for the **DevTinder** application, a robust and secure RESTful API built with Node.js, Express, and MongoDB. It handles all business logic, data persistence, and user authentication, providing a powerful foundation for the dynamic frontend experience.

---

## ✨ Key Features

- **Secure RESTful API:** A well-structured API that provides all necessary endpoints for user management, matching, and connections.
- **JWT & Cookie-Based Authentication:** Secure, stateless authentication using JSON Web Tokens stored in httpOnly cookies, with middleware to protect sensitive routes.
- **User & Profile Management:** Complete CRUD functionality for user profiles, including personal details, bios, and a list of technical skills.
- **Developer Matching Logic:** A sophisticated feed generation algorithm that presents users with potential matches, intelligently excluding profiles they have already interacted with.
- **Connection Request System:** A full state machine for handling connection requests from 'interested' to 'accepted' or 'rejected' states.
- **Data Validation & Error Handling:** Server-side validation for signup and profile updates to ensure data integrity.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
- **Middleware:** CORS, cookie-parser
- **Environment Management:** dotenv

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- A running MongoDB instance (local or on a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Saurabh1590/devTinder.git](https://github.com/Saurabh1590/devTinder.git)
    cd devTinder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the project root and add the following variables:
    ```env
    # Your MongoDB connection string
    DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/devTinder"

    # A strong, secret string for signing JWTs
    JWT_SECRET="YOUR_SUPER_SECRET_STRING_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The API server will be available at `http://localhost:7777`.

---

## 📦 API Endpoints

A summary of the core API routes available:

| Method | Endpoint                       | Description                        | Protected |
| :----- | :----------------------------- | :--------------------------------- | :-------: |
| `POST` | `/signup`                      | Register a new user.               |    No     |
| `POST` | `/login`                       | Authenticate and log in a user.    |    No     |
| `POST` | `/logout`                      | Invalidate the user's session.     |    Yes    |
| `GET`  | `/profile/view`                | Get the current user's profile.    |    Yes    |
| `PATCH`| `/profile/edit`                | Update the current user's profile. |    Yes    |
| `PATCH`| `/profile/password`            | Change the current user's password.|    Yes    |
| `GET`  | `/feed`                        | Get the feed of potential matches. |    Yes    |
| `POST` | `/request/send/:status/:userId`| Send a connection request.         |    Yes    |
| `POST` | `/request/review/:status/:reqId`| Respond to a connection request.   |    Yes    |
| `GET`  | `/user/connections`            | Get all accepted connections.      |    Yes    |
| `GET`  | `/user/requests/received`      | Get all pending received requests. |    Yes    |

---

## 📁 Project Structure

The backend follows a standard feature-based structure to keep the code organized and maintainable.


My sincere apologies for the persistent technical issue. It seems there's a problem with how that specific component is displaying for you.

Let's bypass it completely. Here is the raw Markdown code for the "Project Structure" section. You can copy everything inside the box below and paste it directly into your README.md file.

Markdown

---

## 📁 Project Structure

The backend follows a standard feature-based structure to keep the code organized and maintainable.

src
├── config
│   └── database.js           # Handles MongoDB connection
├── middleware
│   └── auth.js               # JWT authentication middleware
├── models
│   ├── connectionRequest.js  # Mongoose schema for connection requests
│   └── user.js               # Mongoose schema for users
├── routes
│   ├── auth.js               # Routes for signup, login, logout
│   ├── profile.js            # Routes for user profile management
│   ├── request.js            # Routes for handling connection requests
│   └── user.js               # Routes for the feed and connections
├── utils
│   └── validation.js         # Data validation helper functions
└── app.js                    # Main Express application entry point
