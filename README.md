# ⚡ QuickAI — AI-Powered Content Creation Platform

> Transform your content creation workflow with a suite of premium AI tools. Write articles, generate images, review resumes, and enhance visuals — all in one place.

---

## 🚀 Features

| Feature | Description | Plan |
|---|---|---|
| ✍️ Write Article | Generate full-length articles with customizable length | Free |
| #️⃣ Blog Titles | AI-generated blog title ideas by category | Free |
| 🖼️ Generate Images | Text-to-image generation with style options | Premium |
| 🧹 Remove Background | One-click AI background removal from images | Premium |
| ✂️ Remove Object | Remove specific objects from images using AI | Premium |
| 📄 Review Resume | Upload a PDF resume and get AI-powered feedback | Premium |
| 🌐 Community | Browse and like publicly shared AI-generated images | All Users |

---

## 🛠️ Tech Stack

### Frontend
- **React** + **Vite** — Fast, modern frontend
- **Tailwind CSS** — Utility-first styling
- **React Router DOM** — Client-side routing
- **Clerk** — Authentication & subscription management
- **Axios** — HTTP client
- **React Hot Toast** — Notifications
- **React Markdown** — Markdown rendering
- **Lucide React** — Icons

### Backend
- **Node.js** + **Express** — REST API server
- **Clerk Express SDK** — JWT auth middleware & user management
- **Neon (PostgreSQL)** — Serverless database for storing user creations
- **Cloudinary** — Image storage, background removal & object removal
- **Multer** — File upload handling
- **OpenAI SDK (Gemini)** — AI text generation via Google's Gemini 2.0 Flash
- **Clipdrop API** — Text-to-image generation
- **pdf-parse** — PDF text extraction for resume review

---

## 🔐 Authentication System

QuickAI uses **Clerk** for full-stack authentication and subscription management:

- **Sign In / Sign Up** — Handled entirely by Clerk's pre-built UI components
- **JWT Tokens** — Every API request from the frontend sends a Clerk-issued Bearer token; the backend verifies it using `@clerk/express`
- **Subscription Plans** — Clerk's billing integration distinguishes `free` vs `premium` users via the `has({ plan: 'premium' })` check in middleware
- **Usage Tracking** — Free users have their usage count stored in Clerk's `privateMetadata` (resets on premium upgrade)
- **User Profile** — Avatar, full name, and plan status are pulled directly from Clerk's `useUser()` hook

---

## 🗄️ Database Schema

```sql
CREATE TABLE creations (
  id          SERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  prompt      TEXT NOT NULL,
  content     TEXT NOT NULL,
  type        TEXT NOT NULL,       -- 'article' | 'blog-title' | 'image' | 'resume-review'
  publish     BOOLEAN DEFAULT FALSE,
  likes       TEXT[] DEFAULT '{}',
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 📁 Project Structure

```
quickai/
├── client/                   # React frontend (Vite)
│   ├── src/
│   │   ├── assets/           # Images, icons, static data
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── AiTools.jsx
│   │   │   ├── Plan.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CreationItem.jsx
│   │   ├── pages/            # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WriteArticle.jsx
│   │   │   ├── BlogTitles.jsx
│   │   │   ├── GenerateImages.jsx
│   │   │   ├── RemoveBackground.jsx
│   │   │   ├── RemoveObject.jsx
│   │   │   ├── ReviewResume.jsx
│   │   │   └── Community.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── .env
│
└── server/                   # Express backend
    ├── config/
    │   ├── db.js             # Neon PostgreSQL connection
    │   ├── cloudinary.js     # Cloudinary config
    │   └── multer.js         # File upload config
    ├── controllers/
    │   ├── aiController.js   # All AI feature logic
    │   └── userController.js # User data & community logic
    ├── middlewares/
    │   └── auth.js           # Clerk auth + plan check middleware
    ├── routes/
    │   ├── aiRoutes.js
    │   └── userRoutes.js
    └── server.js
```

---

## ⚙️ Environment Variables

### Client (`client/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:8000
```

### Server (`server/.env`)
```env
DATABASE_URL=your_neon_postgres_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## 🏃 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/quickai.git
cd quickai
```

### 2. Install dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Set up environment variables
Copy the `.env` examples above and fill in your API keys.

### 4. Run the development servers

```bash
# Backend (from /server)
npm run dev

# Frontend (from /client)
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:8000`

---

## 📸 Usage Plan Limits

| Feature | Free Plan | Premium Plan |
|---|---|---|
| Write Article | ✅ Up to 10 uses | ✅ Unlimited |
| Blog Titles | ✅ Up to 10 uses | ✅ Unlimited |
| Generate Images | ❌ | ✅ |
| Remove Background | ❌ | ✅ |
| Remove Object | ❌ | ✅ |
| Review Resume | ❌ | ✅ |
| Community | ✅ | ✅ |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Clerk](https://clerk.com) — Authentication & billing
- [Google Gemini](https://ai.google.dev) — AI text generation
- [Clipdrop](https://clipdrop.co) — Image generation
- [Cloudinary](https://cloudinary.com) — Image processing & storage
- [Neon](https://neon.tech) — Serverless PostgreSQL
