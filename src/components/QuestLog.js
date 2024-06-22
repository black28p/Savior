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
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-2 text-blue-200">Quest Log</h2>
      {questLog.length === 0 ? (
        <p className="text-gray-300">No quests available at the moment. Check back later!</p>
      ) : (
        <ul className="list-disc pl-5">
          {questLog.map((quest, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span className="text-gray-200">{quest}</span>
              <button 
                onClick={() => completeQuest(index)}
                className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
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