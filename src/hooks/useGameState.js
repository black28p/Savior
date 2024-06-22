import { useState, useEffect } from 'react';
import { initialGameState } from '../config/gameConfig';

export const useGameState = () => {
  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Financial Adventure: Road to Prosperity</h1>
      {gameState.setupStep === 0 && (
        <IncomeSetup gameState={gameState} setGameState={setGameState} />
      )}
      {gameState.setupStep === 1 && (
        <CategorySelection gameState={gameState} setGameState={setGameState} />
      )}
      {gameState.setupStep === 2 && (
        <BudgetAllocation gameState={gameState} setGameState={setGameState} />
      )}
      <div className="text-center mt-4 text-gray-600">{gameState.message}</div>
    </div>
  );
};

export default GameSetup;