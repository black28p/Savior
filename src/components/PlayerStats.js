import React from 'react';

const PlayerStats = ({ gameState }) => {
  const { playerLevel, currentLocation, score, streak } = gameState;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Player Stats</h2>
      <p>Level: {playerLevel}</p>
      <p>Location: {currentLocation}</p>
      <p>Score: {score} 🌟</p>
      <p>Streak: {streak} days 🔥</p>
    </div>
  );
};

export default PlayerStats;