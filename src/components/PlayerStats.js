import React from 'react';

const PlayerStats = ({ gameState }) => {
  const { playerLevel, currentLocation, score, streak } = gameState;

  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-blue-200">Player Stats</h2>
      <p className="text-gray-200">Level: {playerLevel}</p>
      <p className="text-gray-200">Location: {currentLocation}</p>
      <p className="text-gray-200">Score: {score} 🌟</p>
      <p className="text-gray-200">Streak: {streak} days 🔥</p>
    </div>
  );
};

export default PlayerStats;