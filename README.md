# Recipe Generator + Grocery List

A beautiful, modern web application that helps you discover recipes based on available ingredients and generates organized grocery lists. Built with React frontend and Express backend, designed for deployment on Render.

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

## Deployment on Render

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Use these build settings**:
   - Build Command: `npm run install:all && npm run build`
   - Start Command: `npm start`
4. **Add environment variables**:
   - `SPOONACULAR_API_KEY`: Your Spoonacular API key
   - `NODE_ENV`: `production`

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

## API Endpoints

### Recipe Search
- `GET /api/recipes/search?ingredients=chicken,rice` - Search recipes by ingredients
- `GET /api/recipes/:id` - Get detailed recipe information
- `GET /api/recipes/random` - Get random recipes

### Recipe Management
- `POST /api/recipes/:id/rate` - Rate a recipe (1-5 stars)

### Grocery Lists
- `POST /api/grocery-list/generate` - Generate grocery list from recipe IDs

### Health Check
- `GET /api/health` - API health status

## Features in Detail

### Recipe Search
- Search by available ingredients
- Smart ranking based on ingredient matches
- Beautiful grid layout with hover effects
- Detailed recipe modals with instructions

### Recipe Management
- Save favorite recipes locally
- Rate recipes with star system
- View saved recipes in dedicated tab
- Remove recipes from favorites

### Grocery List
- Generate from selected recipes
- Add custom items manually
- Check off completed items
- Progress tracking
- Clear completed items

### Dark Mode
- System preference detection
- Smooth transitions
- Persistent theme selection
- Consistent color scheme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue if needed
3. Include detailed reproduction steps

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Render](https://render.com/) for hosting platform