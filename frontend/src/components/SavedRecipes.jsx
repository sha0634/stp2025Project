import React, { useState } from 'react';
import { Heart, Clock, Users, Star, ShoppingCart, Trash2 } from 'lucide-react';
import RecipeModal from './RecipeModal';

const SavedRecipes = ({ savedRecipes, onUnsaveRecipe, onAddToGroceryList }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  if (savedRecipes.length === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-8 shadow-lg text-center">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No saved recipes yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start saving your favorite recipes to see them here!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="glass-morphism rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Saved Recipes ({savedRecipes.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map(recipe => (
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
                    onUnsaveRecipe(recipe.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
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
                      onAddToGroceryList([recipe.title + ' ingredients']);
                    }}
                    className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Saved on {new Date(recipe.savedAt).toLocaleDateString()}
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
          onSave={() => {}}
          onUnsave={onUnsaveRecipe}
          onRate={() => {}}
          onAddToGroceryList={onAddToGroceryList}
          isSaved={true}
        />
      )}
    </>
  );
};

export default SavedRecipes;