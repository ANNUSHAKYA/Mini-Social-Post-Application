# Mini Social Post Application (SocialPlanet)

A simple, responsive social post application built as a React.js frontend and Node.js/Express backend, with design inspiration taken from the **TaskPlanet** Social page.

## Features

- **Account Creation**: Full user signup and login flow (validating inputs, toggling password visibility).
- **Custom Avatars**: Integrates Dicebear Adventurer avatars where users can customize their avatar preview by typing a custom theme seed during registration.
- **Create Post**: Post text updates, image files (compressed client-side before upload to base64 to keep payload lightweight), or external image URLs.
- **Timeline Feed**: Public chronological timeline displaying posts from all users. Displays creator handles, relative timestamps, like counts, and comments lists. Includes paginated "Load More" loading logic.
- **Interactive Likes**: Instantly toggle post likes. Hovering or clicking on likes shows the detailed list of usernames who liked the post.
- **Comments Section**: Dynamic inline commenting tray showing username avatars, dates, comment text, and post submissions.
- **Responsiveness**: Mobile bottom navigation tabs matched with a spacious sidebar widget system on desktop (Trending Topics, Who to Follow).
- **MUI Styling**: Premium look and feel without using TailwindCSS.

---

## Tech Stack

- **Frontend**: React.js (Vite), Axios, Material UI (MUI) & Icons
- **Backend**: Node.js, Express, Mongoose, JSON Web Tokens (JWT), BcryptJS
- **Database**: MongoDB (Two Collections: `users` & `posts`)
- **Aesthetic**: Custom Material UI themes, custom CSS resets, responsive widgets.

---

## Getting Started

### 1. Setup Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the port and keys inside `.env`:
   - `PORT=5055`
   - `MONGODB_URI`: Leave commented out to auto-spawn an **in-memory database** for testing, or set your MongoDB Atlas connection string.
   - `JWT_SECRET`: Any random security token.
5. Start backend dev server:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Set the API connection URL:
   - `VITE_API_URL=http://localhost:5055/api`
5. Start the Vite React client:
   ```bash
   npm run dev
   ```
   Open the browser address (e.g. `http://localhost:5177/`).

---

## Project Structure

```
Mini Social Post Application/
├── backend/
│   ├── src/
│   │   ├── config/db.js            # MongoDB loader with in-memory fallbacks
│   │   ├── controllers/            # Controller logic (auth, posts)
│   │   ├── middleware/             # Route authorization middleware
│   │   ├── models/                 # Mongoose schemas (User, Post)
│   │   └── routes/                 # Express route mappings
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/             # Reusable UI cards, forms, loaders
    │   ├── pages/                  # Feed page, login, signup
    │   ├── context/AuthContext.jsx # Axios requests & authentication state
    │   ├── App.jsx                 # Routing and custom MUI Indigo themes
    │   └── index.css               # Global CSS resets
    ├── .env.example
    └── package.json
```
