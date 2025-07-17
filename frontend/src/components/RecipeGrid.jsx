import React, { useState } from 'react';
import { Clock, Users, Star, Heart, ShoppingCart, ChefHat } from 'lucide-react';
import RecipeModal from './RecipeModal';

const RecipeGrid = ({ 
  recipes, 
  loading, 
  savedRecipes, 
  onSaveRecipe, 
  onUnsaveRecipe, 
  onRateRecipe, 
  onAddToGroceryList 
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const isRecipeSaved = (recipeId) => {
    return savedRecipes.some(recipe => recipe.id === recipeId);
  };

  const handleSaveToggle = (recipe) => {
    if (isRecipeSaved(recipe.id)) {
      onUnsaveRecipe(recipe.id);
    } else {
      onSaveRecipe(recipe);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="glass-morphism rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-4 text-lg font-medium text-gray-600 dark:text-gray-300">
            Searching for delicious recipes...
          </span>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-8 shadow-lg text-center">
        <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adding some ingredients to find delicious recipes!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="glass-morphism rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Recipe Suggestions ({recipes.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white/50 dark:bg-gray-700/50 rounded-xl overflow-hidden shadow-md card-hover cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveToggle(recipe);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${
                    isRecipeSaved(recipe.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isRecipeSaved(recipe.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white line-clamp-2">
                  {recipe.title}
                </h3>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.readyInMinutes || 30} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings || 4} servings</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(recipe.userRating || 0)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would need recipe details to get ingredients
                      // For now, we'll add a placeholder
                      onAddToGroceryList([recipe.title + ' ingredients']);
                    }}
                    className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onSave={onSaveRecipe}
          onUnsave={onUnsaveRecipe}
          onRate={onRateRecipe}
          onAddToGroceryList={onAddToGroceryList}
          isSaved={isRecipeSaved(selectedRecipe.id)}
        />
      )}
    </>
  );
};

export default RecipeGrid;