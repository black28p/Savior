import React from 'react';
import PlayerStats from './PlayerStats';
import FinancialDashboard from './FinancialDashboard';
import QuestLog from './QuestLog';
import CityMap from './CityMap';
import BudgetManagement from './BudgetManagement';
import ExpenseSummary from './ExpenseSummary';
import Achievements from './Achievements';
import { initialGameState } from '../config/gameConfig';

const GameInterface = ({ gameState, updateGameState }) => {
  const handleResetGame = () => {
    if (window.confirm("Are you sure you want to reset the game? All progress will be lost.")) {
      // Clear localStorage
      localStorage.clear();
      
      // Reset game state to initial state
      updateGameState(initialGameState);
      
      // Optionally, you can add a message to indicate the game has been reset
      updateGameState(prevState => ({
        ...prevState,
        message: "The game has been reset. Start your new financial adventure!"
      }));
    }
  };

  return (
    <div className="font-sans text-white bg-gray-900 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-300">Financial Adventure: Road to Prosperity</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="sm:col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-blue-200">Your Financial Journey</h2>
          <p className="bg-gray-800 p-4 rounded">{gameState.story}</p>
        </div>
        <PlayerStats gameState={gameState} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <FinancialDashboard gameState={gameState} />
        <QuestLog gameState={gameState} updateGameState={updateGameState} />
      </div>
      
      <CityMap gameState={gameState} updateGameState={updateGameState} />
      <BudgetManagement gameState={gameState} updateGameState={updateGameState} />
      <ExpenseSummary gameState={gameState} updateGameState={updateGameState} />
      <Achievements gameState={gameState} />
      
      <button
        onClick={handleResetGame}
        className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors mt-6"
      >
        Reset Game
      </button>

      {gameState.message && (
        <p className="mt-4 text-center text-yellow-300">{gameState.message}</p>
      )}
    </div>
  );
};

export default GameInterface;