import React from 'react';
import { allCategories, GAME_CONSTANTS, storyTemplates } from '../config/gameConfig';

const CategorySelection = ({ gameState, setGameState }) => {
  const handleCategorySelection = (category) => {
    if (gameState.selectedCategories.includes(category)) {
      setGameState(prevState => ({
        selectedCategories: prevState.selectedCategories.filter(cat => cat !== category)
      }));
    } else if (gameState.selectedCategories.length < GAME_CONSTANTS.MAX_CATEGORIES) {
      setGameState(prevState => ({
        selectedCategories: [...prevState.selectedCategories, category]
      }));
    } else {
      setGameState({ message: `You can select up to ${GAME_CONSTANTS.MAX_CATEGORIES} categories` });
    }
  };

  const handleCategorySelectionComplete = () => {
    if (gameState.selectedCategories.length > 0) {
      setGameState({
        categories: gameState.selectedCategories.map(cat => ({ ...cat, budget: 0 })),
        categoryInputs: gameState.selectedCategories.reduce((acc, cat) => ({...acc, [cat.name]: ''}), {}),
        setupStep: 2,
        story: storyTemplates.categorySelection
      });
    } else {
      setGameState({ message: 'Please select at least one category' });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Select up to {GAME_CONSTANTS.MAX_CATEGORIES} Financial Categories</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {allCategories.map(category => (
          <button
            key={category.name}
            onClick={() => handleCategorySelection(category)}
            className={`p-2 rounded ${
              gameState.selectedCategories.includes(category) 
                ? `bg-${category.color} text-white` 
                : 'bg-gray-200'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleCategorySelectionComplete}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Continue to Budget Allocation
      </button>
    </>
  );
};

export default CategorySelection;