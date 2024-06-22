import React from 'react';
import { useGameState } from '../hooks/useGameState';
import GameSetup from './GameSetup';
import GameInterface from './GameInterface';

const FinancialAdventureGame = () => {
  const [gameState, updateGameState] = useGameState();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Financial Adventure Game</h1>
        <div className="bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          {!gameState.gameStarted ? (
            <GameSetup 
              gameState={gameState} 
              updateGameState={updateGameState} 
            />
          ) : (
            <GameInterface 
              gameState={gameState} 
              updateGameState={updateGameState} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialAdventureGame;