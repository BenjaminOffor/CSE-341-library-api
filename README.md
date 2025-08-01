# 📚 CSE-341 Library API

A simple RESTful API for managing **Books** and **Authors**, built with **Node.js**, **Express**, **MongoDB**, and **Swagger** for documentation. Developed as part of the CSE-341 course (Project 2 Part 1).

---

## 🚀 Features

- ✅ CRUD operations for both Books and Authors
- ✅ Data validation using `express-validator`
- ✅ Error handling with proper HTTP status codes
- ✅ Swagger UI for API documentation and testing
- ✅ MongoDB connection using Mongoose
- ✅ Supports creating multiple authors at once

---

## 📁 Project Structure (MVC)

library-api/
│
├── controllers/ # Business logic
│ ├── authorController.js
│ └── bookController.js
│
├── models/ # Mongoose schemas
│ ├── author.js
│ └── book.js
│
├── routes/ # Express routes
│ ├── authors.js
│ └── books.js
│
├── swagger.yaml # Swagger OpenAPI spec
├── server.js # Main application entry
├── .env # Environment variables
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/BenjaminOffor/CSE-341-library-api.git
cd CSE-341-library-api
Install dependencies

bash
Copy
Edit
npm install
Create a .env file

env
Copy
Edit
MONGODB_URI=mongodb+srv://<your-cluster>.mongodb.net/<your-db>?retryWrites=true&w=majority
Start the server

bash
Copy
Edit
npm run dev
🔌 API Endpoints
Method	Endpoint	Description
GET	/api/authors	Get all authors
GET	/api/authors/:id	Get author by ID
POST	/api/authors	Create single or multiple authors
PUT	/api/authors/:id	Update an author
DELETE	/api/authors/:id	Delete an author
GET	/api/books	Get all books
GET	/api/books/:id	Get book by ID
POST	/api/books	Create a book
PUT	/api/books/:id	Update a book
DELETE	/api/books/:id	Delete a book

📘 API Documentation
Swagger UI
Once the server is running:

bash
Copy
Edit
http://localhost:3000/api-docs
You can view, test, and interact with all endpoints using the Swagger interface.

🧪 API Testing
Use Thunder Client (VS Code Extension) or Postman to test endpoints:

Sample POST (Create Author)
bash
Copy
Edit
POST /api/authors
Content-Type: application/json

{
  "name": "Wole Soyinka",
  "bio": "Nigerian playwright and poet",
  "birthdate": "1934-07-13"
}
Bulk Create Authors
json
Copy
Edit
[
  { "name": "Chinua Achebe", "bio": "Author of Things Fall Apart", "birthdate": "1930-11-16" },
  { "name": "Maya Angelou", "bio": "Poet and civil rights activist", "birthdate": "1928-04-04" }
]
🌐 Deployment
Coming soon on Render or another cloud platform. Once deployed, replace localhost with your public URL.

📚 License
MIT License
© 2025 Benjamin Offor – CSE-341 Project