import { useState, useEffect } from 'react';
import { initialGameState } from '../config/gameConfig';

export const useGameState = () => {
  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (newState) => {
    setGameState(prevState => ({ ...prevState, ...newState }));
  };

  return [gameState, updateGameState];
};

export default useGameState;