import React from 'react';
import { months } from '../config/gameConfig';

const FinancialDashboard = ({ gameState }) => {
  const { currentMonth = 0, currentYear = new Date().getFullYear(), totalSpent = 0, totalIncome = 0 } = gameState;
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Financial Dashboard</h2>
      <div className="space-y-2">
        <p className="text-gray-200">Current Month: {months[currentMonth]} {currentYear}</p>
        <p className={`text-lg ${totalSpent <= totalIncome ? 'text-green-500' : 'text-red-500'}`}>
          Spent: ${totalSpent.toFixed(2)} / ${totalIncome.toFixed(2)}
        </p>
        <p className={`text-lg ${(totalIncome - totalSpent) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          Remaining: ${(totalIncome - totalSpent).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FinancialDashboard;