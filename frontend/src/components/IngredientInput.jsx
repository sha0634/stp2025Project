import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';

const IngredientInput = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const commonIngredients = [
    'chicken', 'beef', 'pork', 'fish', 'eggs', 'milk', 'cheese', 'butter',
    'onion', 'garlic', 'tomato', 'potato', 'carrot', 'broccoli', 'spinach',
    'rice', 'pasta', 'bread', 'flour', 'sugar', 'salt', 'pepper', 'olive oil'
  ];

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      const newIngredients = [...ingredients, inputValue.trim().toLowerCase()];
      setIngredients(newIngredients);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const addCommonIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const handleSearch = () => {
    onSearch(ingredients);
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        What's in your kitchen?
      </h2>
      
      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <button
          onClick={addIngredient}
          className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Added Ingredients */}
      {ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Your Ingredients:
          </h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ingredient => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 rounded-full text-sm font-medium"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Common Ingredients */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Common Ingredients:
        </h3>
        <div className="flex flex-wrap gap-2">
          {commonIngredients.map(ingredient => (
            <button
              key={ingredient}
              onClick={() => addCommonIngredient(ingredient)}
              disabled={ingredients.includes(ingredient)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                ingredients.includes(ingredient)
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-accent-100 dark:hover:bg-accent-800 cursor-pointer'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={ingredients.length === 0}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all shadow-md ${
          ingredients.length === 0
            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          Find Recipes ({ingredients.length} ingredients)
        </div>
      </button>
    </div>
  );
};

export default IngredientInput;