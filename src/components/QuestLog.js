import React from 'react';

const QuestLog = ({ gameState, setGameState }) => {
  const { questLog } = gameState;

  const completeQuest = (questIndex) => {
    setGameState(prevState => ({
      questLog: prevState.questLog.filter((_, index) => index !== questIndex),
      playerLevel: prevState.playerLevel + 1,
      score: prevState.score + 100,
      story: `Congratulations! You completed a quest and gained valuable financial experience. Your level is now ${prevState.playerLevel + 1}!`
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quest Log</h2>
      <ul className="list-disc pl-5">
        {questLog.map((quest, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{quest}</span>
            <button 
              onClick={() => completeQuest(index)}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestLog;