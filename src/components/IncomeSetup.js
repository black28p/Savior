import React from 'react';
import { storyTemplates } from '../config/gameConfig';

const IncomeSetup = ({ gameState, setGameState }) => {
  const handleIncomeSubmit = () => {
    const income = parseFloat(gameState.incomeInput);
    if (!isNaN(income) && income > 0) {
      setGameState({
        totalIncome: income,
        setupStep: 1,
        story: storyTemplates.incomeSetup(income)
      });
    } else {
      setGameState({ message: 'Please enter a valid income amount' });
    }
  };

  return (
    <div className="text-white">
      <p className="mb-4">Welcome, adventurer! Before you begin your journey in Prosperity City, let's set up your initial finances.</p>
      <input
        type="number"
        value={gameState.incomeInput}
        onChange={(e) => setGameState({ incomeInput: e.target.value })}
        placeholder="Enter your starting monthly income"
        className="w-full p-2 mb-4 border rounded bg-gray-800 text-white border-gray-700"
      />
      <button
        onClick={handleIncomeSubmit}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Set Starting Income
      </button>
    </div>
  );
};

export default IncomeSetup;