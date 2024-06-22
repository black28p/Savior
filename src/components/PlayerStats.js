import React from 'react';

const PlayerStats = ({ gameState }) => {
  const { playerLevel, currentLocation, score, streak } = gameState;
  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Player Stats</h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <p className="text-gray-200">Level: {playerLevel}</p>
        <p className="text-gray-200">Score: {score} 🌟</p>
        <p className="text-gray-200">Location: {currentLocation}</p>
        <p className="text-gray-200">Streak: {streak} days 🔥</p>
      </div>
    </div>
  );
};

export default PlayerStats;