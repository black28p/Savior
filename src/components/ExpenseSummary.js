import React from 'react';

const ExpenseSummary = ({ gameState, updateGameState }) => {
  const handleEditExpense = (categoryName, newAmount) => {
    updateGameState(prevState => {
      const oldExpense = prevState.expenses.find(exp => exp.name === categoryName);
      const oldAmount = oldExpense ? oldExpense.spent : 0;
      return {
        ...prevState,
        expenses: prevState.expenses.map(exp =>
          exp.name === categoryName
            ? { ...exp, spent: parseFloat(newAmount) }
            : exp
        ),
        totalSpent: (prevState.totalSpent || 0) - oldAmount + parseFloat(newAmount),
        message: `Updated expense for ${categoryName}`
      };
    });
    // Note: You might want to call checkAchievements and calculateScore here
  };

  const handleDeleteExpense = (categoryName) => {
    updateGameState(prevState => {
      const expenseToDelete = prevState.expenses.find(exp => exp.name === categoryName);
      const amountToDelete = expenseToDelete ? expenseToDelete.spent : 0;
      return {
        ...prevState,
        expenses: prevState.expenses.map(exp =>
          exp.name === categoryName ? { ...exp, spent: 0 } : exp
        ),
        totalSpent: (prevState.totalSpent || 0) - amountToDelete,
        message: `Deleted expense for ${categoryName}`
      };
    });
    // Note: You might want to call checkAchievements and calculateScore here
  };

  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Expense Summary</h2>
      {(gameState.expenses || []).map(exp => (
        <div key={exp.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 bg-gray-700 p-3 rounded">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="text-2xl mr-3">{exp.icon}</span>
            <span className="font-medium text-gray-200">{exp.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
            <span className="mb-2 sm:mb-0 sm:mr-4 text-gray-300">${(exp.spent || 0).toFixed(2)} / ${(exp.budget || 0).toFixed(2)}</span>
            <div className="flex w-full sm:w-auto">
              <button 
                onClick={() => {
                  const newAmount = prompt(`Enter new amount for ${exp.name}:`, exp.spent);
                  if (newAmount !== null && !isNaN(newAmount)) {
                    handleEditExpense(exp.name, newAmount);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 text-sm flex-grow sm:flex-grow-0"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete the expense for ${exp.name}?`)) {
                    handleDeleteExpense(exp.name);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex-grow sm:flex-grow-0"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {gameState.message && <p className="text-center text-sm text-gray-400 mt-3">{gameState.message}</p>}
    </div>
  );
};

export default ExpenseSummary;