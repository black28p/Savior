import React from 'react';

const Achievements = ({ gameState }) => {
  const playerAchievements = gameState.playerAchievements || [];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Achievements</h2>
      {playerAchievements.length === 0 ? (
        <p>No achievements unlocked yet. Keep playing to earn achievements!</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {playerAchievements.map(achievement => (
            <div 
              key={achievement.name} 
              className={`flex items-center p-2 bg-gray-100 rounded ${achievement.reached ? 'opacity-100' : 'opacity-50'}`}
            >
              <span className="text-2xl mr-2">{achievement.icon}</span>
              <div>
                <div className="font-medium">{achievement.name}</div>
                <div className="text-sm">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;