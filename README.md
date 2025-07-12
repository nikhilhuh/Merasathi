# 💑 MeraSathi - Matrimony Web Application

MeraSathi is a modern, full-stack matrimony web application built to connect people seeking partners. The platform allows users to explore profiles, view detailed information, send/receive match requests, and manage their profile easily.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React.js** (with functional components & hooks)
- **Core CSS** (custom styling without any UI framework)
- **Axios** (for HTTP communication)

### 🔸 Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** for data storage (Mongoose ODM)
- **CORS** for handling cross-origin requests

---

## ✨ Features

### ✅ Authentication
- User **Signup** and **Signin**
- Session maintained via secure token (handled in frontend state/context)

### ✅ Profile Management
- View your own profile and update full details
- Upload profile image
- Add personal information, preferences, and bio

### ✅ Matchmaking
- Explore other users' profiles
- View full profile of any user
- Send match requests

### ✅ Match Requests
- View **sent** and **received** requests (with filters like pending, accepted, rejected)
- Accept or reject incoming requests
- UI indicators for each request status

### ✅ Clean UI & UX
- Responsive design using CSS Grid and Flexbox
- Seamless routing using `react-router-dom`
- Intuitive modals and feedback for errors/success

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/nikhilhuh/Merasathi.git
cd Merasathi
```

### 2. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup backend

```bash
cd backend
npm install
npm run dev
```

Ensure MongoDB is running locally or update the Mongo URI in .env
and also ensure that .env exists (which is there as not gitignore it)

---

## 📄 License

Currently **No License**        

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to:

- ⭐ Star the repository to show your support
- 🐛 Report bugs or request features via [issues](../../issues)
- 🔧 Submit pull requests for improvements or new features

Please ensure your code adheres to the existing style and includes relevant tests if applicable.

