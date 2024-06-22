// GameInterface.js
import React from 'react';
import PlayerStats from './PlayerStats';
import FinancialDashboard from './FinancialDashboard';
import QuestLog from './QuestLog';
import CityMap from './CityMap';
import BudgetManagement from './BudgetManagement';
import ExpenseSummary from './ExpenseSummary';
import Achievements from './Achievements';

const GameInterface = ({ gameState, updateGameState }) => {
  const handleResetGame = () => {
    if (window.confirm("Are you sure you want to reset the game? All progress will be lost.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="font-sans text-white bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-300">Financial Adventure: Road to Prosperity</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-blue-200">Your Financial Journey</h2>
          <p className="bg-gray-800 p-4 rounded">{gameState.story}</p>
        </div>
        <PlayerStats gameState={gameState} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <FinancialDashboard gameState={gameState} />
        <QuestLog gameState={gameState} updateGameState={updateGameState} />
      </div>
      <CityMap gameState={gameState} updateGameState={updateGameState} />
      <BudgetManagement gameState={gameState} updateGameState={updateGameState} />
      <ExpenseSummary gameState={gameState} updateGameState={updateGameState} />
      <Achievements gameState={gameState} />
      <button
        onClick={handleResetGame}
        className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors mt-4"
      >
        Reset Game
      </button>
    </div>
  );
};

export default GameInterface;