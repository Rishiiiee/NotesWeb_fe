# 📝 Mini Notes Web App

A **basic fullstack web application** built to strengthen backend fundamentals using **Node.js**, **Express**, and **MongoDB**. This mini notes app includes **authentication with JWT**, **password hashing with bcrypt**, and **CRUD operations** for personal notes. The frontend is built with **React.js** and styled using **CSS**.

This project was created as a backend-focused hands-on learning tool, where I implemented essential backend concepts like routing, controllers, models, protected routes, and database operations — all connected to a working frontend.

---

## 🔍 Project Overview

Users can:

- 🔐 Register & Log In (with password hashing via **bcrypt**)
- 🔑 Receive **JWT token** upon login to access protected routes
- 🗒️ Create personal notes
- ✏️ Edit & 🗑️ Delete their own notes
- 📄 View note details on a separate page

> 🧠 This project was built with a goal to understand **backend logic**, **authentication**, and **integrating a backend API with a React frontend**.

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React.js, CSS               |
| Backend   | Node.js, Express.js         |
| Auth      | JWT, bcrypt                 |
| Database  | MongoDB (Mongoose)          |
| API Calls | Axios                       |

---

## 🚀 Features

- 🧾 Notes List & Detail View
- 🔐 User Authentication with JWT
- 🧂 Password Hashing with bcrypt
- ✍️ Add / Edit / Delete Notes
- ✅ Protected Routes – only logged-in users can manage notes
- 🌐 Axios for HTTP Requests
- 📁 MVC folder structure (routes, controllers, models)

---

## 🧪 Getting Started

### 1️⃣ Clone the Repositories

```bash
git clone https://github.com/yourusername/notes-web-fe.git
git clone https://github.com/yourusername/notes-web-be.git
### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start React App

```bash
npm start
```

---

## 🌄 Screenshots

|Home Page|
<img width="400" height="400" alt="2025-08-07 (4)" src="https://github.com/user-attachments/assets/376440fc-13e7-43b2-9242-3a4c0eb1df9b" />
|
|Notes Dashboard|
<img width="400" height="400" alt="2025-08-07" src="https://github.com/user-attachments/assets/c1e4e20f-0b80-4530-8516-587f5ff3098d" />
|
|Notes Detail| 
<img width="400" height="400" alt="2025-08-07 (2)" src="https://github.com/user-attachments/assets/47e1c3b6-cbd6-4e03-89d5-17b6f9fd9739" /> |



## 🌐 Live Demo

🛍️ Try the Live App(Frontend): [Visit Live Site](https://notes-web-fe.vercel.app/)

⚙️ Backend API: [Visit Live API](https://notesweb-backend.onrender.com)

🔐 Auth Flow
1 : User registers with email & password

2 : Password is hashed with bcrypt before storing in DB

3 : On login, a JWT token is returned

4 : This token is used to access protected endpoints for note management

> Make sure the backend (e.g., Render or Railway) is active for full functionality like product data, login, and cart management.
> Free services like Render or Railway may take a few seconds to wake up if idle.

## 👤 Author

**Shrivastav Rishi**  

