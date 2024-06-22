import React from 'react';

const BudgetManagement = ({ gameState, updateGameState }) => {
  const handleCategoryClick = (category) => {
    updateGameState(prevState => ({
      ...prevState,
      selectedCategory: category,
      message: `Selected: ${category.name}`
    }));
  };

  const handleAddExpense = () => {
    if (gameState.selectedCategory && gameState.inputAmount && !isNaN(gameState.inputAmount)) {
      const amount = parseFloat(gameState.inputAmount);
      updateGameState(prevState => ({
        ...prevState,
        expenses: prevState.expenses.map(exp =>
          exp.name === prevState.selectedCategory.name
            ? { ...exp, spent: (exp.spent || 0) + amount }
            : exp
        ),
        totalSpent: (prevState.totalSpent || 0) + amount,
        message: `Added $${amount} to ${prevState.selectedCategory.name}`,
        inputAmount: '',
        selectedCategory: null
      }));
      // Note: You might want to call checkAchievements and calculateScore here
    } else {
      updateGameState(prevState => ({
        ...prevState,
        message: 'Please select a category and enter a valid amount'
      }));
    }
  };

  return (
    <div className="mb-6 text-white">
      <h2 className="text-xl font-semibold mb-2 text-blue-200">Budget Management</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {(gameState.categories || []).map(category => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`p-2 rounded text-white hover:opacity-80`}
            style={{backgroundColor: category.color}}
          >
            <div className="text-2xl">{category.icon}</div>
            <div>{category.name}</div>
          </button>
        ))}
      </div>
      <input
        type="number"
        value={gameState.inputAmount || ''}
        onChange={(e) => updateGameState(prevState => ({ ...prevState, inputAmount: e.target.value }))}
        placeholder="Enter amount"
        className="w-full p-2 mb-2 border rounded bg-gray-800 text-white border-gray-700"
      />
      <button
        onClick={handleAddExpense}
        className="w-full p-2 mb-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Add Expense
      </button>
      {gameState.message && <p className="text-center text-sm text-gray-300">{gameState.message}</p>}
    </div>
  );
};

export default BudgetManagement;