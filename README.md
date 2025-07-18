# Recipe Generator + Grocery List

A beautiful, modern web application that helps you discover recipes based on available ingredients and generates organized grocery lists. Built with React frontend and Express backend.

## Features

### Frontend
- 🔍 **Ingredient-based Recipe Search** - Find recipes using ingredients you have
- 🍽️ **Beautiful Recipe Cards** - High-quality images and detailed information
- ⭐ **Recipe Rating System** - Rate and save your favorite recipes
- 💾 **Recipe Favorites** - Save recipes for easy access later
- 🛒 **Smart Grocery Lists** - Generate grocery lists from recipe ingredients
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices

### Backend
- 🔗 **Spoonacular API Integration** - Access to thousands of recipes
- 💾 **Recipe Rating Storage** - Persistent rating system
- 🛒 **Grocery List Generation** - Smart ingredient aggregation
- 🔒 **Security Features** - Rate limiting, CORS, and security headers
- ⚡ **Performance Optimized** - Efficient API calls and caching

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, Axios
- **API**: Spoonacular Food API
- **Deployment**: Render
- **Styling**: Tailwind CSS with custom design system

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Spoonacular API key (get one at https://spoonacular.com/food-api)

### Installation

1. **Clone and install dependencies**
```bash
npm run install:all
```

2. **Set up environment variables**
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` and add your Spoonacular API key:
```
SPOONACULAR_API_KEY=your-actual-api-key-here
```

3. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001



## Project Structure

```
recipe-generator/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Express backend
│   ├── server.js           # Main server file
│   ├── .env.example        # Environment variables template
│   └── package.json        # Backend dependencies
├── render.yaml             # Render deployment config
└── README.md              # This file
```

