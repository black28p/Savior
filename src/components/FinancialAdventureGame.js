import React from 'react';
import useGameState from '../hooks/useGameState';
import GameSetup from './GameSetup';
import GameInterface from './GameInterface';

const FinancialAdventureGame = () => {
  const [gameState, updateGameState] = useGameState();

  console.log('Current game state:', gameState);

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {!gameState.gameStarted ? (
          <GameSetup gameState={gameState} updateGameState={updateGameState} />
        ) : (
          <GameInterface gameState={gameState} updateGameState={updateGameState} />
        )}
      </div>
    </div>
  );
};

export default FinancialAdventureGame;