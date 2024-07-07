# Blog API

## Overview
This repository contains the backend API for the Blog project. It is built with Express.js and MongoDB, and provides a RESTful interface for managing blog posts, comments, and users. JWT authentication is used to secure certain routes.

## Features
- CRUD operations for blog posts and comments.
- JWT authentication for securing admin routes.
- Mongoose for database modeling and interaction.

## Getting Started
### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
### Running the Application
Start the MongoDB server.
Start the development server:
```bash
npm start
```
The API will be available at http://localhost:3000.
## API Endpoints
POST /login: Authenticate a user and return a JWT.

POST /register: Register a new user.

GET /posts: Retrieve all blog posts.

GET /posts/:id: Retrieve a specific blog post.

POST /posts: Create a new blog post (protected).

PUT /posts/:id: Update a blog post (protected).

DELETE /posts/:id: Delete a blog post (protected).

POST /posts/:id/comments: Add a comment to a blog post.

DELETE /comments/:id: Delete a comment (protected).
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
