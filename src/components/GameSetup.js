import React from 'react';
import { GAME_CONSTANTS } from '../config/gameConfig';
import { allCategories } from '../config/gameConfig';

const GameSetup = ({ gameState, setGameState }) => {
  const handleIncomeSubmit = () => {
    const income = parseFloat(gameState.incomeInput);
    if (!isNaN(income) && income > 0) {
      setGameState(prevState => ({
        totalIncome: income,
        setupStep: 1,
        story: `Great! You're starting your journey with a monthly income of $${income}. Now, let's choose your financial priorities.`
      }));
    } else {
      setGameState(prevState => ({ message: 'Please enter a valid income amount' }));
    }
  };

  const handleCategorySelection = (category) => {
    setGameState(prevState => {
      if (prevState.selectedCategories.includes(category)) {
        return { selectedCategories: prevState.selectedCategories.filter(cat => cat !== category) };
      } else if (prevState.selectedCategories.length < GAME_CONSTANTS.MAX_CATEGORIES) {
        return { selectedCategories: [...prevState.selectedCategories, category] };
      } else {
        return { message: `You can select up to ${GAME_CONSTANTS.MAX_CATEGORIES} categories` };
      }
    });
  };

  const handleCategorySelectionComplete = () => {
    if (gameState.selectedCategories.length > 0) {
      setGameState(prevState => ({
        categories: prevState.selectedCategories.map(cat => ({ ...cat, budget: 0 })),
        categoryInputs: prevState.selectedCategories.reduce((acc, cat) => ({...acc, [cat.name]: ''}), {}),
        setupStep: 2,
        story: "Excellent choices! Now, let's allocate your income across these categories. Remember, balancing your budget is key to financial success!"
      }));
    } else {
      setGameState(prevState => ({ message: 'Please select at least one category' }));
    }
  };

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
      setGameState(prevState => ({ message: 'Please enter valid budget amounts for all categories' }));
      return;
    }

    const totalBudget = budgets.reduce((sum, cat) => sum + cat.budget, 0);
    if (totalBudget > gameState.totalIncome) {
      setGameState(prevState => ({ message: 'Total category budgets exceed your income. Please adjust.' }));
      return;
    }

    setGameState(prevState => ({
      categories: budgets,
      expenses: budgets.map(cat => ({ ...cat, spent: 0 })),
      gameStarted: true,
      story: "Congratulations! You've set up your initial budget. Your adventure in Prosperity City begins now. Explore the city, complete quests, and make wise financial decisions to prosper!"
    }));
  };

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Financial Adventure: Road to Prosperity</h1>
      {gameState.setupStep === 0 && (
        <>
          <p className="mb-4">Welcome, adventurer! Before you begin your journey in Prosperity City, let's set up your initial finances.</p>
          <input
            type="number"
            value={gameState.incomeInput}
            onChange={(e) => setGameState(prevState => ({ incomeInput: e.target.value }))}
            placeholder="Enter your starting monthly income"
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleIncomeSubmit}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Set Starting Income
          </button>
        </>
      )}
      {gameState.setupStep === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Select up to {GAME_CONSTANTS.MAX_CATEGORIES} Financial Categories</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {gameState.allCategories.map(category => (
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
      )}
      {gameState.setupStep === 2 && (
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
      )}
      <div className="text-center mt-4 text-gray-600">{gameState.message}</div>
    </div>
  );
};

export default GameSetup;