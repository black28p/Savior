import React from 'react';

const ExpenseSummary = ({ gameState, setGameState }) => {
  const handleEditExpense = (categoryName, newAmount) => {
    setGameState(prevState => ({
      expenses: prevState.expenses.map(exp =>
        exp.name === categoryName
          ? { ...exp, spent: parseFloat(newAmount) }
          : exp
      ),
      totalSpent: prevState.totalSpent - prevState.expenses.find(exp => exp.name === categoryName).spent + parseFloat(newAmount),
      message: `Updated expense for ${categoryName}`
    }));
    // Note: You might want to call checkAchievements and calculateScore here
  };

  const handleDeleteExpense = (categoryName) => {
    const expenseToDelete = gameState.expenses.find(exp => exp.name === categoryName);
    setGameState(prevState => ({
      expenses: prevState.expenses.map(exp =>
        exp.name === categoryName ? { ...exp, spent: 0 } : exp
      ),
      totalSpent: prevState.totalSpent - expenseToDelete.spent,
      message: `Deleted expense for ${categoryName}`
    }));
    // Note: You might want to call checkAchievements and calculateScore here
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Expense Summary</h2>
      {gameState.expenses.map(exp => (
        <div key={exp.name} className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{exp.icon}</span>
            <span className="font-medium">{exp.name}</span>
          </div>
          <div className="text-right">
            <span className="mr-4">${exp.spent.toFixed(2)} / ${exp.budget.toFixed(2)}</span>
            <button 
              onClick={() => {
                const newAmount = prompt(`Enter new amount for ${exp.name}:`, exp.spent);
                if (newAmount !== null && !isNaN(newAmount)) {
                  handleEditExpense(exp.name, newAmount);
                }
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete the expense for ${exp.name}?`)) {
                  handleDeleteExpense(exp.name);
                }
              }}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;