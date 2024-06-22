import { useState, useEffect, useCallback } from 'react';
import { initialGameState } from '../config/gameConfig';

export const useGameState = () => {
  const [gameState, setGameState] = useState(() => {
    try {
      const savedState = localStorage.getItem('gameState');
      return savedState ? JSON.parse(savedState) : initialGameState;
    } catch (error) {
      console.error('Error loading saved state:', error);
      return initialGameState;
    }
  });

  useEffect(() => {
    const saveState = () => {
      try {
        localStorage.setItem('gameState', JSON.stringify(gameState));
      } catch (error) {
        console.error('Error saving game state:', error);
      }
    };

    saveState();

    window.addEventListener('beforeunload', saveState);
    return () => window.removeEventListener('beforeunload', saveState);
  }, [gameState]);

  const updateGameState = useCallback((newState) => {
    setGameState(prevState => {
      const updatedState = typeof newState === 'function' 
        ? newState(prevState) 
        : { ...prevState, ...newState };
      return updatedState;
    });
  }, []);

  return [gameState, updateGameState];
};