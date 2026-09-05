# 🤖 BIS Saathi AI

> AI-powered assistant for exploring BIS standards, guidelines, compliance requirements, and industry-related information through an intelligent conversational interface.

## 📌 About The Project

**BIS Saathi AI** is a full-stack AI-powered assistant designed to help users understand and explore information related to the **Bureau of Indian Standards (BIS)**.

The platform provides a conversational interface where users can ask questions and receive AI-generated responses related to standards, guidelines, compliance requirements, and industry information.

The application also provides user authentication, chat history, source references, multilingual support, and a modern responsive interface.

## ✨ Features

* 🤖 AI-powered conversational assistant
* 🔐 User Signup & Login
* 🔑 JWT-based authentication
* 💬 Create and manage conversations
* 📝 Chat history
* 📚 Source references for AI responses
* 🌐 Multilingual support
* 🌙 Dark & Light mode
* 👤 User-specific conversations
* 🔒 Protected backend APIs
* 📱 Responsive user interface
* ⚡ Fast and modern React interface

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Context API
* Lucide React
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* REST API

### AI

* Google Gemini API

### Tools

* Git
* GitHub
* Postman
* VS Code

## 📂 Project Structure

```text
BIS-Saathi-AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
https://github.com/Vishal2059/BIS_Saathi_AI.git
```

```bash
cd BIS-Saathi-AI
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

## 🔐 Environment Variables

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:4000/api
```

### Backend

Create:

```text
backend/.env
```

Add your own credentials:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

## 🚀 Run The Project

### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:4000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on the Vite development server.

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
Authentication / Chat API
  ↓
Node.js + Express Backend
  ↓
MongoDB
  ↓
Gemini AI
  ↓
AI Response
  ↓
React Chat Interface

## 🔮 Future Improvements

* 📄 BIS document/PDF knowledge base
* 🔎 Advanced standards search
* 📚 RAG-based document retrieval
* 🎙️ Voice-based interaction
* 📊 Admin dashboard
* 📱 Mobile application
* 💡 Personalized industry recommendations
* 🔔 Notifications and updates
* 🚀 Production deployment

## 🎯 Project Objective

The primary objective of BIS Saathi AI is to make standards and compliance-related information easier to understand and access through an AI-powered conversational interface.

## 👨‍💻 Author

**Vishal Yadav**

B.Tech – Information Technology

* GitHub: `github.com/Vishal2059`
* LinkedIn: Add your LinkedIn profile here

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
