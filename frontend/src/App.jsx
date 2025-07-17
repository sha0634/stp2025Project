import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChefHat } from 'lucide-react';
import IngredientInput from './components/IngredientInput';
import RecipeGrid from './components/RecipeGrid';
import GroceryList from './components/GroceryList';
import SavedRecipes from './components/SavedRecipes';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedRecipesData = localStorage.getItem('savedRecipes');
    const savedGroceryList = localStorage.getItem('groceryList');
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedRecipesData) {
      setSavedRecipes(JSON.parse(savedRecipesData));
    }
    
    if (savedGroceryList) {
      setGroceryList(JSON.parse(savedGroceryList));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleRecipeSearch = async (ingredients) => {
    if (ingredients.length === 0) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/recipes/search?ingredients=${ingredients.join(',')}`);
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipe) => {
    const updatedSavedRecipes = [...savedRecipes, { ...recipe, savedAt: new Date().toISOString() }];
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  };

  const handleUnsaveRecipe = (recipeId) => {
    const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  };

  const handleRateRecipe = async (recipeId, rating) => {
    try {
      await fetch(`/api/recipes/${recipeId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating })
      });
      
      // Update local state
      const updatedRecipes = recipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, userRating: rating } : recipe
      );
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error rating recipe:', error);
    }
  };

  const handleAddToGroceryList = (ingredients) => {
    const newItems = ingredients.map(ingredient => ({
      id: Date.now() + Math.random(),
      name: ingredient,
      checked: false
    }));
    
    const updatedGroceryList = [...groceryList, ...newItems];
    setGroceryList(updatedGroceryList);
    localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));
  };

  const tabs = [
    { id: 'search', label: 'Search Recipes', icon: ChefHat },
    { id: 'saved', label: 'Saved Recipes', icon: ChefHat },
    { id: 'grocery', label: 'Grocery List', icon: ChefHat }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="glass-morphism rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl font-bold gradient-text">Recipe Generator</h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/70 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="glass-morphism rounded-2xl p-2 mb-8 shadow-lg">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="animate-fade-in">
          {activeTab === 'search' && (
            <div className="space-y-8">
              <IngredientInput onSearch={handleRecipeSearch} />
              <RecipeGrid 
                recipes={recipes} 
                loading={loading}
                savedRecipes={savedRecipes}
                onSaveRecipe={handleSaveRecipe}
                onUnsaveRecipe={handleUnsaveRecipe}
                onRateRecipe={handleRateRecipe}
                onAddToGroceryList={handleAddToGroceryList}
              />
            </div>
          )}
          
          {activeTab === 'saved' && (
            <SavedRecipes 
              savedRecipes={savedRecipes}
              onUnsaveRecipe={handleUnsaveRecipe}
              onAddToGroceryList={handleAddToGroceryList}
            />
          )}
          
          {activeTab === 'grocery' && (
            <GroceryList 
              groceryList={groceryList}
              setGroceryList={setGroceryList}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;