# BioChem Vision

> AI-powered biochemistry image analysis platform. Upload an image, pick a question, get an academic-grade written answer.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authentication & Access Model](#authentication--access-model)
- [The Four Questions](#the-four-questions)
- [AI Integration](#ai-integration)
- [Frontend Pages](#frontend-pages)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)

---

## Overview

BioChem Vision lets students and researchers upload biochemistry images and receive detailed AI-powered written explanations. The analysis is driven by Google's Gemini 2.0 Flash model (multimodal), which processes each image through one of four expert biochemistry prompts.

Users can try the platform once as a guest. After that, they must create a free account, which unlocks up to 10 image analyses per day.

---

## Features

- **Image upload** — drag-and-drop or click to upload; JPG, PNG, WEBP, max 5MB
- **Four expert question types** — structure identification, metabolic pathways, enzyme analysis, experimental interpretation
- **AI vision analysis** — Google Gemini 2.0 Flash processes images and returns written academic answers
- **Guest access** — one free analysis without an account
- **Daily usage limits** — registered users get 5 analyses per day; resets at midnight
- **JWT authentication** — secure login and session management
- **Usage tracking** — per-user and per-guest usage logged in MongoDB
- **Responsive UI** — works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | CSS-in-JS (scoped `<style>` per component) |
| Fonts | Cormorant Garamond, DM Mono (Google Fonts) |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| AI Model | Google Gemini 2.0 Flash (multimodal) |
| API | Google Generative Language API |

---

## Project Structure

```
project/
├── backend/
│   ├── server.js                   # Express app entry point
│   ├── .env                        # Environment variables (never commit this)
│   ├── routes/
│   │   ├── auth.js                 # Sign up, sign in, sign out routes
│   │   └── ai.js                   # POST /api/ai/answer — core AI route
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification + guest passthrough
│   │   └── guestMiddleware.js      # Daily limit + guest-use cap enforcement
│   ├── models/
│   │   ├── User.js                 # User schema (name, email, hashed password)
│   │   └── UsageLog.js             # Logs every image submission
│   └── config/
│       └── db.js                   # MongoDB connection
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                # React entry point
│       ├── App.jsx                 # Root component, routing, auth state
│       ├── context/
│       │   └── AuthContext.jsx     # Global auth context + useAuth hook
│       ├── pages/
│       │   ├── LandingPage.jsx     # Marketing/home page
│       │   ├── LoginPage.jsx       # Sign-in form
│       │   ├── SignupPage.jsx      # Registration form
│       │   └── QuizPage.jsx        # Main analysis dashboard
│       ├── components/
│       │   ├── QuestionCard.jsx    # Individual question with uploader + answer
│       │   ├── GuestLimitModal.jsx # Modal shown when guest tries to exceed 1 use
│       │   └── DailyLimitModal.jsx # Modal shown when daily limit is reached
│       ├── api/
│       │   └── apiClient.js        # Centralised fetch functions
│       └── utils/
│           └── guestSession.js     # Guest ID generation and localStorage helpers
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- A Google Gemini API key — get one free at [aistudio.google.com](https://aistudio.google.com)

### 1. Clone and install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

Create `backend/.env` — see [Environment Variables](#environment-variables) below.

### 3. Run the backend

```bash
cd backend
node server.js
# or with auto-restart:
npx nodemon server.js
```

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000`.

### 5. Register an account or try as guest

Open `http://localhost:5173`. You can try one analysis as a guest, or create a free account for full access.

---

## Environment Variables

Create a file at `backend/.env` with the following:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/biochemvision
# or your Atlas connection string:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/biochemvision

# Auth
JWT_SECRET=replace_with_a_long_random_secret_string

# AI
GEMINI_API_KEY=your_google_gemini_api_key_here

# Usage limits
MAX_IMAGES_PER_DAY=10
GUEST_MAX_USES=1
```

> Never commit `.env` to version control. Add it to `.gitignore`.

---

## API Reference

All routes are prefixed with `/api`.

### Auth routes — `/api/auth`

These are pre-existing routes you built. Expected contract:

| Method | Route | Body | Returns |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | `{ user, token }` |
| POST | `/auth/login` | `{ email, password }` | `{ user, token }` |

### AI route — `/api/ai`

#### `POST /api/ai/answer`

Accepts an image and returns an AI-generated written answer.

**Headers**

```
Content-Type: application/json
Authorization: Bearer <token>    // for logged-in users
```

**Body**

```json
{
  "imageBase64": "<base64 encoded image string>",
  "mimeType": "image/jpeg",
  "questionNumber": 1,
  "guestId": "uuid-string"       // only for guests, omit if using token
}
```

`questionNumber` must be an integer from 1 to 4.

**Success response — 200**

```json
{ "answer": "The image shows a phospholipid bilayer..." }
```

**Error responses**

| Status | Meaning |
|---|---|
| 400 | Missing image or invalid question number |
| 401 | No valid token and no guest ID provided |
| 403 | Guest has already used their one free analysis |
| 429 | Logged-in user has reached their daily image limit |
| 500 | Gemini API error or internal failure |

---

## Authentication & Access Model

```
Landing Page
├── Try as Guest ──→ QuizPage (1 analysis allowed, then GuestLimitModal)
├── Sign In ───────→ LoginPage ──→ QuizPage (10 analyses/day)
└── Sign Up ───────→ SignupPage ──→ QuizPage (10 analyses/day, auto-login)
```

**Guest users**
- Identified by a UUID stored in `localStorage` as `guestId`
- Allowed exactly `GUEST_MAX_USES` (default: 1) total analyses, ever
- Tracked in `UsageLog` with `userId: null` and their `guestId`
- Hitting the limit shows a modal prompting sign-up

**Registered users**
- Identified by a JWT stored in `localStorage`
- Allowed `MAX_IMAGES_PER_DAY` (default: 10) analyses per calendar day
- Daily count resets at midnight (server time)
- A progress bar in the nav shows remaining uses
- Hitting the limit shows a modal with the reset countdown

---

## The Four Questions

Each question maps to a fixed, hardcoded prompt sent to the Gemini model along with the uploaded image.

| # | Topic | What the AI answers |
|---|---|---|
| 1 | Structure Identification | What biochemical structures or molecules are shown? What are their functions and biological significance? |
| 2 | Metabolic Pathway | What metabolic pathway is illustrated? Explain each step shown in the image. |
| 3 | Enzyme & Protein Analysis | Identify the enzyme(s) or proteins shown and describe their mechanism of action. |
| 4 | Experimental Interpretation | What technique or experimental result is depicted? Interpret the findings and their implications. |

Prompts are defined in `backend/routes/ai.js` in the `BIOCHEM_PROMPTS` object and are not user-editable.

---

## AI Integration

The platform uses the **Google Gemini 2.0 Flash** model via the Generative Language REST API.

**Endpoint:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY
```

**Request shape:**
```json
{
  "contents": [{
    "parts": [
      { "text": "<biochemistry prompt for selected question>" },
      { "inline_data": { "mime_type": "image/jpeg", "data": "<base64 image>" } }
    ]
  }]
}
```

The image is converted to base64 on the frontend before being sent to your backend, which then forwards it to Gemini. The backend never stores the image itself — only a usage log entry.

**Why Gemini 2.0 Flash?**
- Free tier: 15 requests per minute, 1 million tokens per minute
- Native multimodal support (understands both text and images in one call)
- Fast response times suitable for a real-time web app

**Alternative free options if needed:**
- **OpenRouter** — unified gateway with access to multiple free models under one key
- **AIML API** — 400+ models on a free tier, no credit card required

---

## Frontend Pages

| Page | Route (client-side) | Description |
|---|---|---|
| `LandingPage` | `/` (state: `landing`) | Hero, feature grid, question overview, CTAs |
| `LoginPage` | `/` (state: `login`) | Email/password sign-in with guest-expired banner |
| `SignupPage` | `/` (state: `signup`) | Registration form with password strength meter and perks panel |
| `QuizPage` | `/` (state: `quiz`) | Four question cards, usage bar, guest/daily limit modals |

Routing is handled via React state in `App.jsx` (no React Router dependency). Each page transition is a state update.

**Components inside QuizPage:**

- `QuestionCard` — handles file selection, drag-and-drop preview, API call, and answer display for one question
- `GuestLimitModal` — fullscreen overlay prompting sign-up when a guest exceeds their one free use
- `DailyLimitModal` — fullscreen overlay showing the reset countdown when a registered user hits 10/day

---

## Deployment

### Backend (e.g. Railway, Render, Fly.io)

1. Set all environment variables from `.env` in your hosting dashboard
2. Set the start command to `node server.js`
3. Make sure your MongoDB Atlas cluster allows connections from your host's IP (or use `0.0.0.0/0` for development)

### Frontend (e.g. Vercel, Netlify)

1. Build the frontend: `npm run build` (output: `dist/`)
2. Set the publish directory to `dist`
3. Add an environment variable if needed: `VITE_API_URL=https://your-backend.com`
4. Update `vite.config.js` proxy target to your production backend URL, or configure rewrites in your host's dashboard to proxy `/api/*` to the backend

### CORS

Add CORS configuration to `backend/server.js`:

```js
import cors from "cors";
app.use(cors({ origin: "https://your-frontend-domain.com", credentials: true }));
```

---

## Known Limitations

- **No image storage** — images are base64-encoded, sent to Gemini, and discarded. There is no history of past analyses.
- **Guest tracking is client-side** — a guest can bypass their one-use limit by clearing localStorage. For stricter enforcement, use IP-based tracking or fingerprinting on the backend.
- **Daily limit is per-server-day** — resets at midnight in the server's timezone, not the user's local timezone.
- **No password reset flow** — the "Forgot password?" button in the login page is a placeholder and requires a separate implementation (e.g. nodemailer + reset token).
- **Single file uploads only** — each question card accepts one image at a time. Multiple images per question are not supported.
- **Gemini free tier rate limits** — at 15 RPM, heavy concurrent usage may hit rate limits. Monitor usage in Google AI Studio.