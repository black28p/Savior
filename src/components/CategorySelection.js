import React from 'react';
import { allCategories, GAME_CONSTANTS, storyTemplates } from '../config/gameConfig';

const CategorySelection = ({ gameState, updateGameState }) => {
  const handleCategorySelection = (category) => {
    console.log('Button clicked:', category.name);
    updateGameState(prevState => {
      console.log('Previous state:', prevState);
      let updatedCategories;
      if (prevState.selectedCategories.some(cat => cat.name === category.name)) {
        updatedCategories = prevState.selectedCategories.filter(cat => cat.name !== category.name);
      } else if (prevState.selectedCategories.length < GAME_CONSTANTS.MAX_CATEGORIES) {
        updatedCategories = [...prevState.selectedCategories, category];
      } else {
        console.log('Cannot select more than', GAME_CONSTANTS.MAX_CATEGORIES, 'categories');
        return { ...prevState, message: `You can select up to ${GAME_CONSTANTS.MAX_CATEGORIES} categories` };
      }
      console.log('Updated categories:', updatedCategories);
      return { ...prevState, selectedCategories: updatedCategories, message: '' };
    });
  };

  const handleCategorySelectionComplete = () => {
    if (gameState.selectedCategories.length > 0) {
      updateGameState(prevState => ({
        ...prevState,
        categories: prevState.selectedCategories.map(cat => ({ ...cat, budget: 0 })),
        categoryInputs: prevState.selectedCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: '' }), {}),
        setupStep: 2,
        story: storyTemplates.categorySelection
      }));
    } else {
      updateGameState(prevState => ({ ...prevState, message: 'Please select at least one category' }));
    }
  };

  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-200">Select up to {GAME_CONSTANTS.MAX_CATEGORIES} Financial Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {allCategories.map(category => (
          <button
            key={category.name}
            onClick={() => handleCategorySelection(category)}
            className={`p-3 rounded flex items-center justify-center ${
              gameState.selectedCategories.some(cat => cat.name === category.name)
                ? `bg-${category.color} text-white` 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleCategorySelectionComplete}
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Continue to Budget Allocation
      </button>
      {gameState.message && <p className="text-red-400 mt-4">{gameState.message}</p>}
    </div>
  );
};

export default CategorySelection;