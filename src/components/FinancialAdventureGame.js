import React from 'react';
import useGameState from '../hooks/useGameState';
import GameSetup from './GameSetup';
import CategorySelection from './CategorySelection';
import BudgetAllocation from './BudgetAllocation';

const GameInterface = ({ gameState, setGameState }) => {
  // Implement your main game interface here
  return (
    <div>
      <h1>Game Interface</h1>
      <CategorySelection gameState={gameState} setGameState={setGameState} />
      <BudgetAllocation gameState={gameState} setGameState={setGameState} />
      {/* Add other game components as needed */}
    </div>
  );
};

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