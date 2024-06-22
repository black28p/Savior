import React from 'react';

const BudgetManagement = ({ gameState, setGameState }) => {
  const handleCategoryClick = (category) => {
    setGameState(prevState => ({
      selectedCategory: category,
      message: `Selected: ${category.name}`
    }));
  };

  const handleAddExpense = () => {
    if (gameState.selectedCategory && gameState.inputAmount && !isNaN(gameState.inputAmount)) {
      const amount = parseFloat(gameState.inputAmount);
      setGameState(prevState => ({
        expenses: prevState.expenses.map(exp =>
          exp.name === prevState.selectedCategory.name
            ? { ...exp, spent: exp.spent + amount }
            : exp
        ),
        totalSpent: prevState.totalSpent + amount,
        message: `Added $${amount} to ${prevState.selectedCategory.name}`,
        inputAmount: '',
        selectedCategory: null
      }));
      // Note: You might want to call checkAchievements and calculateScore here
    } else {
      setGameState({ message: 'Please select a category and enter a valid amount' });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Budget Management</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {gameState.categories.map(category => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`p-2 rounded text-white`}
            style={{backgroundColor: category.color}}
          >
            <div className="text-2xl">{category.icon}</div>
            <div>{category.name}</div>
          </button>
        ))}
      </div>
      <input
        type="number"
        value={gameState.inputAmount}
        onChange={(e) => setGameState({ inputAmount: e.target.value })}
        placeholder="Enter amount"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleAddExpense}
        className="w-full p-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Add Expense
      </button>
    </div>
  );
};

export default BudgetManagement;