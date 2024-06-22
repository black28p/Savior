import React from 'react';
import CategorySelection from './CategorySelection';
import { GAME_CONSTANTS } from '../config/gameConfig';

const GameSetup = ({ gameState, updateGameState }) => {
  const handleIncomeSubmit = () => {
    const income = parseFloat(gameState.incomeInput);
    if (!isNaN(income) && income > 0) {
      updateGameState({
        totalIncome: income,
        setupStep: 1,
        story: `Great! You're starting your journey with a monthly income of $${income}. Now, let's choose your financial priorities.`
      });
    } else {
      updateGameState({ message: 'Please enter a valid income amount' });
    }
  };

  const handleCategoryBudgetChange = (category, value) => {
    console.log(`Updating budget for ${category} to ${value}`);
    updateGameState(prevState => {
      const newState = {
        ...prevState,
        categoryInputs: { ...prevState.categoryInputs, [category]: value }
      };
      console.log('New state after budget change:', newState);
      return newState;
    });
  };

  const handleCategoryBudgetsSubmit = () => {
    console.log('Submitting category budgets');
    const budgets = Object.entries(gameState.categoryInputs).map(([name, budget]) => ({
      name,
      budget: parseFloat(budget),
      ...gameState.selectedCategories.find(cat => cat.name === name)
    }));

    console.log('Calculated budgets:', budgets);

    if (budgets.some(cat => isNaN(cat.budget) || cat.budget < 0)) {
      console.log('Invalid budget amounts detected');
      updateGameState({ message: 'Please enter valid budget amounts for all categories' });
      return;
    }

    const totalBudget = budgets.reduce((sum, cat) => sum + cat.budget, 0);
    console.log('Total budget:', totalBudget, 'Total income:', gameState.totalIncome);

    if (totalBudget > gameState.totalIncome) {
      console.log('Budget exceeds income');
      updateGameState({ message: 'Total category budgets exceed your income. Please adjust.' });
      return;
    }

    console.log('Budgets valid, starting game');
    updateGameState({
      categories: budgets,
      expenses: budgets.map(cat => ({ ...cat, spent: 0 })),
      gameStarted: true,
      story: "Congratulations! You've set up your initial budget. Your adventure in Prosperity City begins now!"
    });
  };

  return (
    <div className="font-sans text-white bg-gray-900 p-4 sm:p-6 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-300">Financial Adventure: Road to Prosperity</h1>
      {gameState.setupStep === 0 && (
        <div className="space-y-4">
          <p className="mb-4">Welcome, adventurer! Before you begin your journey in Prosperity City, let's set up your initial finances.</p>
          <input
            type="number"
            value={gameState.incomeInput}
            onChange={(e) => {
              console.log('Input value:', e.target.value);
              updateGameState({ incomeInput: e.target.value });
            }}
            placeholder="Enter your starting monthly income"
            className="w-full p-3 mb-4 border rounded bg-gray-800 text-white border-gray-700"
          />
          <button
            onClick={handleIncomeSubmit}
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Set Starting Income
          </button>
        </div>
      )}
      {gameState.setupStep === 1 && (
        <CategorySelection gameState={gameState} updateGameState={updateGameState} />
      )}
      {gameState.setupStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-200">Allocate Your Monthly Budget</h2>
          {gameState.selectedCategories.map(cat => (
            <div key={cat.name} className="mb-4">
              <label className="block mb-2 text-gray-300">{cat.name}</label>
              <input
                type="number"
                value={gameState.categoryInputs[cat.name]}
                onChange={(e) => {
                  console.log(`Changing ${cat.name} budget to:`, e.target.value);
                  handleCategoryBudgetChange(cat.name, e.target.value);
                }}
                placeholder={`Enter budget for ${cat.name}`}
                className="w-full p-3 border rounded bg-gray-800 text-white border-gray-700"
              />
            </div>
          ))}
          <button
            onClick={() => {
              console.log('Submitting budgets');
              handleCategoryBudgetsSubmit();
            }}
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Start Your Financial Adventure!
          </button>
        </div>
      )}
      <div className="text-center mt-4 text-red-400">{gameState.message}</div>
    </div>
  );
};

export default GameSetup;