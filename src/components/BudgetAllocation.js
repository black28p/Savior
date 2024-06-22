import React from 'react';
import { storyTemplates } from '../config/gameConfig';

const BudgetAllocation = ({ gameState, setGameState }) => {
  const handleCategoryBudgetChange = (category, value) => {
    setGameState(prevState => ({
      ...prevState,
      categoryInputs: {...prevState.categoryInputs, [category]: value}
    }));
  };

  const handleCategoryBudgetsSubmit = () => {
    const budgets = Object.entries(gameState.categoryInputs).map(([name, budget]) => ({
      name,
      budget: parseFloat(budget),
      ...gameState.selectedCategories.find(cat => cat.name === name)
    }));

    if (budgets.some(cat => isNaN(cat.budget) || cat.budget < 0)) {
      setGameState(prevState => ({ ...prevState, message: 'Please enter valid budget amounts for all categories' }));
      return;
    }

    const totalBudget = budgets.reduce((sum, cat) => sum + cat.budget, 0);
    if (totalBudget > gameState.totalIncome) {
      setGameState(prevState => ({ ...prevState, message: 'Total category budgets exceed your income. Please adjust.' }));
      return;
    }

    setGameState(prevState => ({
      ...prevState,
      categories: budgets,
      expenses: budgets.map(cat => ({ ...cat, spent: 0 })),
      gameStarted: true,
      story: storyTemplates.gameStart
    }));
  };

  return (
    <div className="text-white space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-200">Allocate Your Monthly Budget</h2>
      {gameState.selectedCategories.map(cat => (
        <div key={cat.name} className="mb-4">
          <label className="block mb-2 text-gray-300">{cat.name}</label>
          <input
            type="number"
            value={gameState.categoryInputs[cat.name]}
            onChange={(e) => handleCategoryBudgetChange(cat.name, e.target.value)}
            placeholder={`Enter budget for ${cat.name}`}
            className="w-full p-3 border rounded bg-gray-800 text-white border-gray-700"
          />
        </div>
      ))}
      <button
        onClick={handleCategoryBudgetsSubmit}
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Start Your Financial Adventure!
      </button>
    </div>
  );
};

export default BudgetAllocation;