import { useState, useEffect } from 'react';
import { initialGameState } from '../config/gameConfig';

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('gameState');
    console.log('Initial state:', savedState ? JSON.parse(savedState) : initialGameState);
    return savedState ? JSON.parse(savedState) : initialGameState;
  });

  useEffect(() => {
    console.log('Updating localStorage:', gameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (newState) => {
    console.log('Updating state:', newState);
    setGameState(prevState => {
      const updatedState = { ...prevState, ...newState };
      console.log('Updated state:', updatedState);
      return updatedState;
    });
  };

  return [gameState, updateGameState];
};

export default useGameState;