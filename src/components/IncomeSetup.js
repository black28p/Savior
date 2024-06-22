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
    <>
      <p className="mb-4">Welcome, adventurer! Before you begin your journey in Prosperity City, let's set up your initial finances.</p>
      <input
        type="number"
        value={gameState.incomeInput}
        onChange={(e) => setGameState({ incomeInput: e.target.value })}
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
  );
};

export default IncomeSetup;