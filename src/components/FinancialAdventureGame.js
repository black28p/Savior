import React from 'react';
import { useGameState } from '../hooks/useGameState';
import IncomeSetup from './IncomeSetup';
import CategorySelection from './CategorySelection';
import BudgetAllocation from './BudgetAllocation';

const FinancialAdventureGame = () => {
  const [gameState, setGameState] = useGameState();

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {!gameState.gameStarted ? (
          <GameSetup gameState={gameState} setGameState={setGameState} />
        ) : (
          <GameInterface gameState={gameState} setGameState={setGameState} />
        )}
      </div>
    </div>
  );
};

export default FinancialAdventureGame;