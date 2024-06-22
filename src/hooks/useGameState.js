// useGameState.js
import { useState, useEffect } from 'react';
import { initialGameState } from '../config/gameConfig';

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('gameState');
    console.log('Saved state from localStorage:', savedState);
    let parsedState;
    if (savedState) {
      try {
        parsedState = JSON.parse(savedState);
      } catch (error) {
        console.error('Error parsing saved state:', error);
        parsedState = initialGameState;
      }
    } else {
      parsedState = initialGameState;
    }
    console.log('Initial game state:', parsedState);
    return parsedState;
  });

  useEffect(() => {
    console.log('Saving game state to localStorage:', gameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (newState) => {
    console.log('Updating game state with:', newState);
    setGameState(prevState => {
      const updatedState = typeof newState === 'function' 
        ? newState(prevState) 
        : { ...prevState, ...newState };
      console.log('Updated game state:', updatedState);
      return updatedState;
    });
  };

  return [gameState, updateGameState];
};