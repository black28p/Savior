import React from 'react';
import { storyTemplates } from '../config/gameConfig';

const BudgetAllocation = ({ gameState, setGameState }) => {
  const handleCategoryBudgetChange = (category, value) => {
    setGameState(prevState => ({
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
      setGameState({ message: 'Please enter valid budget amounts for all categories' });
      return;
    }

    const totalBudget = budgets.reduce((sum, cat) => sum + cat.budget, 0);
    if (totalBudget > gameState.totalIncome) {
      setGameState({ message: 'Total category budgets exceed your income. Please adjust.' });
      return;
    }

    setGameState({
      categories: budgets,
      expenses: budgets.map(cat => ({ ...cat, spent: 0 })),
      gameStarted: true,
      story: storyTemplates.gameStart
    });
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Allocate Your Monthly Budget</h2>
      {gameState.selectedCategories.map(cat => (
        <div key={cat.name} className="mb-4">
          <label className="block mb-2">{cat.name}</label>
          <input
            type="number"
            value={gameState.categoryInputs[cat.name]}
            onChange={(e) => handleCategoryBudgetChange(cat.name, e.target.value)}
            placeholder={`Enter budget for ${cat.name}`}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={handleCategoryBudgetsSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Start Your Financial Adventure!
      </button>
    </>
  );
};

export default BudgetAllocation;