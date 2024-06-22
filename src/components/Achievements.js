import React from 'react';

const Achievements = ({ gameState }) => {
  const playerAchievements = gameState.playerAchievements || [];

  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Achievements</h2>
      {playerAchievements.length === 0 ? (
        <p className="text-gray-300">No achievements unlocked yet. Keep playing to earn achievements!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {playerAchievements.map(achievement => (
            <div 
              key={achievement.name} 
              className={`flex items-start sm:items-center p-3 bg-gray-700 rounded ${achievement.reached ? 'opacity-100' : 'opacity-50'}`}
            >
              <span className="text-2xl mr-3 flex-shrink-0">{achievement.icon}</span>
              <div>
                <div className="font-medium text-white">{achievement.name}</div>
                <div className="text-sm text-gray-300">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;