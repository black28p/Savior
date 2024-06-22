import React from 'react';

const QuestLog = ({ gameState, setGameState }) => {
  const questLog = gameState.questLog || [];
  
  const completeQuest = (questIndex) => {
    setGameState(prevState => ({
      ...prevState,
      questLog: prevState.questLog.filter((_, index) => index !== questIndex),
      playerLevel: prevState.playerLevel + 1,
      score: prevState.score + 100,
      story: `Congratulations! You completed a quest and gained valuable financial experience. Your level is now ${prevState.playerLevel + 1}!`
    }));
  };

  return (
    <div className="text-white bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Quest Log</h2>
      {questLog.length === 0 ? (
        <p className="text-gray-300">No quests available at the moment. Check back later!</p>
      ) : (
        <ul className="space-y-3">
          {questLog.map((quest, index) => (
            <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 p-3 rounded">
              <span className="text-gray-200 mb-2 sm:mb-0">{quest}</span>
              <button 
                onClick={() => completeQuest(index)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestLog;