import React from 'react';
import { months } from '../config/gameConfig';

const FinancialDashboard = ({ gameState }) => {
  const { currentMonth, currentYear, totalSpent, totalIncome } = gameState;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Financial Dashboard</h2>
      <p>Current Month: {months[currentMonth]} {currentYear}</p>
      <p className={totalSpent <= totalIncome ? 'text-green-500' : 'text-red-500'}>
        Spent: ${totalSpent.toFixed(2)} / ${totalIncome.toFixed(2)}
      </p>
      <p className={(totalIncome - totalSpent) >= 0 ? 'text-green-500' : 'text-red-500'}>
        Remaining: ${(totalIncome - totalSpent).toFixed(2)}
      </p>
    </div>
  );
};

export default FinancialDashboard;