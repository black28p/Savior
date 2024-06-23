import React from 'react';
import { getFormattedDate, getDaysSinceLastPlayed } from '../config/gameConfig';

const FinancialDashboard = ({ gameState }) => {
  const { 
    currentMonth, 
    currentYear, 
    totalSpent = 0, 
    totalIncome = 0,
    daysPlayed,
    gameStartDate,
    lastPlayedDate
  } = gameState;

  const formattedDate = getFormattedDate(currentMonth, currentYear);
  const daysSinceLastPlayed = getDaysSinceLastPlayed(gameState);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Financial Dashboard</h2>
      <div className="space-y-2">
        <p className="text-gray-200">Current Period: {formattedDate}</p>
        <p className="text-gray-200">Days Played: {daysPlayed}</p>
        <p className="text-gray-200">Game Started: {new Date(gameStartDate).toLocaleDateString()}</p>
        <p className={`text-lg ${totalSpent <= totalIncome ? 'text-green-500' : 'text-red-500'}`}>
          Spent: ${totalSpent.toFixed(2)} / ${totalIncome.toFixed(2)}
        </p>
        <p className={`text-lg ${(totalIncome - totalSpent) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          Remaining: ${(totalIncome - totalSpent).toFixed(2)}
        </p>
        {daysSinceLastPlayed > 1 && (
          <p className="text-yellow-300 text-sm">
            It's been {daysSinceLastPlayed} days since your last play. Come back daily for best results!
          </p>
        )}
      </div>
    </div>
  );
};

export default FinancialDashboard;