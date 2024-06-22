import React, { useState, useEffect } from 'react';

const allCategories = [
  { name: 'Housing', color: '#FF6B6B', icon: '🏠' },
  { name: 'Food', color: '#4ECDC4', icon: '🍽️' },
  { name: 'Transportation', color: '#45B7D1', icon: '🚗' },
  { name: 'Utilities', color: '#FF9F1C', icon: '💡' },
  { name: 'Insurance', color: '#2EC4B6', icon: '🛡️' },
  { name: 'Medical & Healthcare', color: '#E71D36', icon: '🏥' },
  { name: 'Savings', color: '#4D9DE0', icon: '💰' },
  { name: 'Debt Payments', color: '#7B2D26', icon: '💳' },
  { name: 'Personal Spending', color: '#3D5A80', icon: '🛍️' },
  { name: 'Recreation & Entertainment', color: '#FF5733', icon: '🎭' },
  { name: 'Clothing', color: '#9B59B6', icon: '👕' },
  { name: 'Education', color: '#F4A261', icon: '📚' },
  { name: 'Childcare', color: '#2ECC71', icon: '👶' },
  { name: 'Investments', color: '#27AE60', icon: '📈' },
  { name: 'Gifts & Donations', color: '#E67E22', icon: '🎁' },
  { name: 'Business Expenses', color: '#34495E', icon: '💼' },
  { name: 'Pet Care', color: '#D35400', icon: '🐾' },
  { name: 'Travel', color: '#16A085', icon: '✈️' },
  { name: 'Technology', color: '#8E44AD', icon: '💻' },
  { name: 'Subscriptions', color: '#2980B9', icon: '📱' },
];

const achievements = [
  { name: 'Saver Starter', description: 'Reach your savings goal', icon: '🌱', reached: false },
  { name: 'Budget Master', description: 'Stay under budget for a week', icon: '🏆', reached: false },
  { name: 'Expense Ninja', description: 'Track expenses for 5 days in a row', icon: '🥷', reached: false },
  { name: 'Category Conqueror', description: 'Stay under budget in all categories for a month', icon: '🏅', reached: false },
  { name: 'Savings Superstar', description: 'Save 20% of your income for 3 months in a row', icon: '🌟', reached: false },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BudgetAdventureGame = () => {
  const [totalIncome, setTotalIncome] = useState(() => {
    const saved = localStorage.getItem('totalIncome');
    return saved ? parseFloat(saved) : 0;
  });
  const [incomeInput, setIncomeInput] = useState('');
  const [gameStarted, setGameStarted] = useState(() => {
    return localStorage.getItem('gameStarted') === 'true';
  });
  const [setupStep, setSetupStep] = useState(() => {
    return parseInt(localStorage.getItem('setupStep') || '0');
  });
  const [totalSpent, setTotalSpent] = useState(() => {
    const saved = localStorage.getItem('totalSpent');
    return saved ? parseFloat(saved) : 0;
  });
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const saved = localStorage.getItem('selectedCategories');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [];
  });
  const [categoryInputs, setCategoryInputs] = useState({});
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputAmount, setInputAmount] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem('score') || '1000');
  });
  const [scoreBreakdown, setScoreBreakdown] = useState(() => {
    const saved = localStorage.getItem('scoreBreakdown');
    return saved ? JSON.parse(saved) : { base: 1000 };
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('streak') || '0');
  });
  const [lastPlayDate, setLastPlayDate] = useState(() => {
    return localStorage.getItem('lastPlayDate');
  });
  const [playerAchievements, setPlayerAchievements] = useState(() => {
    const saved = localStorage.getItem('playerAchievements');
    return saved ? JSON.parse(saved) : achievements;
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    return parseInt(localStorage.getItem('currentMonth') || new Date().getMonth().toString());
  });
  const [currentYear, setCurrentYear] = useState(() => {
    return parseInt(localStorage.getItem('currentYear') || new Date().getFullYear().toString());
  });
  const [daysInMonth, setDaysInMonth] = useState(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  });

  const remainingBudget = categories.reduce((total, cat) => total - cat.budget, totalIncome);

  useEffect(() => {
    localStorage.setItem('totalIncome', totalIncome.toString());
    localStorage.setItem('gameStarted', gameStarted.toString());
    localStorage.setItem('setupStep', setupStep.toString());
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('score', score.toString());
    localStorage.setItem('scoreBreakdown', JSON.stringify(scoreBreakdown));
    localStorage.setItem('streak', streak.toString());
    localStorage.setItem('lastPlayDate', lastPlayDate || '');
    localStorage.setItem('playerAchievements', JSON.stringify(playerAchievements));
    localStorage.setItem('currentMonth', currentMonth.toString());
    localStorage.setItem('currentYear', currentYear.toString());
  }, [totalIncome, gameStarted, setupStep, selectedCategories, categories, expenses, score, scoreBreakdown, streak, lastPlayDate, playerAchievements, currentMonth, currentYear]);
  
  useEffect(() => {
    const newTotalSpent = expenses.reduce((total, exp) => total + exp.spent, 0);
    setTotalSpent(newTotalSpent);
  }, [expenses]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPlayDate !== today) {
      setStreak(prev => prev + 1);
      setLastPlayDate(today);
    }
    
    checkAchievements();
    calculateScore();
  }, [expenses, streak, playerAchievements]);

  const checkAchievements = () => {
    const newAchievements = playerAchievements.map(achievement => {
      if (achievement.name === 'Saver Starter' && !achievement.reached && 
          expenses.find(exp => exp.name === 'Savings')?.spent >= categories.find(cat => cat.name === 'Savings')?.budget) {
        return { ...achievement, reached: true };
      }
      if (achievement.name === 'Budget Master' && !achievement.reached && remainingBudget >= 0) {
        return { ...achievement, reached: true };
      }
      if (achievement.name === 'Expense Ninja' && !achievement.reached && streak >= 5) {
        return { ...achievement, reached: true };
      }
      if (achievement.name === 'Category Conqueror' && !achievement.reached && 
          categories.every(cat => expenses.find(exp => exp.name === cat.name)?.spent <= cat.budget)) {
        return { ...achievement, reached: true };
      }
      if (achievement.name === 'Savings Superstar' && !achievement.reached) {
        const savingsCategory = categories.find(cat => cat.name === 'Savings');
        if (savingsCategory && savingsCategory.budget >= totalIncome * 0.2) {
          const lastThreeMonths = expenses.filter(exp => exp.name === 'Savings').slice(-3);
          if (lastThreeMonths.length === 3 && lastThreeMonths.every(exp => exp.spent >= exp.budget)) {
            return { ...achievement, reached: true };
          }
        }
      }
      return achievement;
    });
    
    setPlayerAchievements(newAchievements);
  };

  const calculateScore = () => {
  let newScore = 1000; // Base score
  let newScoreBreakdown = { base: 1000 };

  // Bonus for staying under budget
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.spent, 0);
  if (totalSpent <= totalBudget) {
    const budgetBonus = Math.floor((1 - totalSpent / totalBudget) * 500);
    newScore += budgetBonus;
    newScoreBreakdown.budgetBonus = budgetBonus;
  }

  // Penalty for overspending
  const overspentCategories = expenses.filter(exp => exp.spent > exp.budget);
  if (overspentCategories.length > 0) {
    const overspendingPenalty = overspentCategories.length * 100;
    newScore -= overspendingPenalty;
    newScoreBreakdown.overspendingPenalty = -overspendingPenalty;
  }

  // Bonus for streak
  const streakBonus = streak * 10;
  newScore += streakBonus;
  newScoreBreakdown.streakBonus = streakBonus;

  setScore(newScore);
  setScoreBreakdown(newScoreBreakdown);
};

  const handleIncomeSubmit = () => {
    const income = parseFloat(incomeInput);
    if (!isNaN(income) && income > 0) {
      setTotalIncome(income);
      setSetupStep(1);
    } else {
      setMessage('Please enter a valid income amount');
    }
  };

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setMessage('You can select up to 6 categories');
    }
  };

  const handleCategorySelectionComplete = () => {
    if (selectedCategories.length > 0) {
      setCategories(selectedCategories.map(cat => ({ ...cat, budget: 0 })));
      setCategoryInputs(selectedCategories.reduce((acc, cat) => ({...acc, [cat.name]: ''}), {}));
      setSetupStep(2);
    } else {
      setMessage('Please select at least one category');
    }
  };

  const handleCategoryBudgetChange = (category, value) => {
    setCategoryInputs(prev => ({...prev, [category]: value}));
  };

  const handleCategoryBudgetsSubmit = () => {
    const budgets = Object.entries(categoryInputs).map(([name, budget]) => ({
      name,
      budget: parseFloat(budget),
      ...allCategories.find(cat => cat.name === name)
    }));

    if (budgets.some(cat => isNaN(cat.budget) || cat.budget < 0)) {
      setMessage('Please enter valid budget amounts for all categories');
      return;
    }

    const totalBudget = budgets.reduce((sum, cat) => sum + cat.budget, 0);
    if (totalBudget > totalIncome) {
      setMessage('Total category budgets exceed your income. Please adjust.');
      return;
    }

    setCategories(budgets);
    setExpenses(budgets.map(cat => ({ ...cat, spent: 0 })));
    setGameStarted(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMessage(`Selected: ${category.name}`);
  };

  const handleAddExpense = () => {
    if (selectedCategory && inputAmount && !isNaN(inputAmount)) {
      const amount = parseFloat(inputAmount);
      setExpenses(prevExpenses =>
        prevExpenses.map(exp =>
          exp.name === selectedCategory.name
            ? { ...exp, spent: exp.spent + amount }
            : exp
        )
      );
      setTotalSpent(prev => prev + amount);
      setMessage(`Added $${amount} to ${selectedCategory.name}`);
      setInputAmount('');
      setSelectedCategory(null);
      calculateScore();
    } else {
      setMessage('Please select a category and enter a valid amount');
    }
  };

  const handleClearGame = () => {
    setExpenses(categories.map(cat => ({ ...cat, spent: 0 })));
    setScore(1000);
    setScoreBreakdown({ base: 1000 });
    setStreak(0);
    setLastPlayDate(null);
    setPlayerAchievements(achievements);
    setMessage('Game cleared. Starting a new month!');
    
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setDaysInMonth(new Date(currentYear, currentMonth + 1, 0).getDate());
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setSetupStep(0);
    setTotalIncome(0);
    setIncomeInput('');
    setSelectedCategories([]);
    setCategoryInputs({});
    setCategories([]);
    setExpenses([]);
    setScore(1000);
    setScoreBreakdown({ base: 1000 });
    setStreak(0);
    setLastPlayDate(null);
    setPlayerAchievements(achievements);
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
    setDaysInMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate());
    setMessage('Game reset. Start over with new income and budgets.');
  };

  return (
  <>
    {!gameStarted ? (
      <div className="budget-setup" style={{maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif'}}>
        <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Budget Adventure Game</h1>
        {setupStep === 0 && (
          <>
            <input
              type="number"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              placeholder="Enter your monthly income"
              style={{width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box'}}
            />
            <button
              onClick={handleIncomeSubmit}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Set Income
            </button>
          </>
        )}
        {setupStep === 1 && (
          <>
            <h2>Select up to 6 Categories</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
              {allCategories.map(category => (
                <button
                  key={category.name}
                  onClick={() => handleCategorySelection(category)}
                  style={{
                    width: '48%',
                    margin: '5px 0',
                    padding: '10px',
                    backgroundColor: selectedCategories.includes(category) ? category.color : '#f0f0f0',
                    color: selectedCategories.includes(category) ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
            <button
              onClick={handleCategorySelectionComplete}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Continue
            </button>
          </>
        )}
        {setupStep === 2 && (
          <>
            <h2>Set Your Category Budgets</h2>
            {selectedCategories.map(cat => (
              <div key={cat.name} style={{marginBottom: '10px'}}>
                <label>{cat.name}</label>
                <input
                  type="number"
                  value={categoryInputs[cat.name]}
                  onChange={(e) => handleCategoryBudgetChange(cat.name, e.target.value)}
                  placeholder={`Enter budget for ${cat.name}`}
                  style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}
                />
              </div>
            ))}
            <button
              onClick={handleCategoryBudgetsSubmit}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Start Game
            </button>
          </>
        )}
        <div style={{textAlign: 'center', margin: '10px 0', color: '#666'}}>{message}</div>
      </div>
    ) : (
      <div className="budget-game" style={{maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif'}}>
        <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Budget Adventure Game</h1>
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
          <div style={{fontSize: '24px', fontWeight: 'bold'}}>Score: {score} 🌟</div>
          <div>Streak: {streak} days 🔥</div>
          <div>Current Month: {months[currentMonth]} {currentYear}</div>
          <div style={{color: totalSpent <= totalIncome ? 'green' : 'red'}}>
            Spent: ${totalSpent.toFixed(2)} / ${totalIncome.toFixed(2)}
          </div>
          <div style={{color: (totalIncome - totalSpent) >= 0 ? 'green' : 'red'}}>
            Remaining: ${(totalIncome - totalSpent).toFixed(2)}
          </div>
        </div>
        <div style={{marginBottom: '20px'}}>
          <h3>Score Breakdown:</h3>
          {Object.entries(scoreBreakdown).map(([key, value]) => (
            <div key={key} style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px'}}>
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              style={{
                width: '48%',
                margin: '5px 0',
                padding: '10px',
                backgroundColor: category.color,
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              <div style={{fontSize: '24px'}}>{category.icon}</div>
              <div>{category.name}</div>
            </button>
          ))}
        </div>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Enter amount"
          style={{width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box'}}
        />
        <button
          onClick={handleAddExpense}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Add Expense
        </button>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
          <button
            onClick={handleClearGame}
            style={{
              width: '48%',
              padding: '10px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear Month
          </button>
          <button
            onClick={handleResetGame}
            style={{
              width: '48%',
              padding: '10px',
              backgroundColor: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reset Game
          </button>
        </div>
        <div style={{textAlign: 'center', margin: '10px 0', color: '#666'}}>{message}</div>
        <div>
          <h2>Expense Summary:</h2>
          {expenses.map(exp => (
            <div key={exp.name} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
              <span>{exp.icon} {exp.name}</span>
              <span>${exp.spent.toFixed(2)} / ${exp.budget.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div>
          <h2>Achievements:</h2>
          {playerAchievements.map(achievement => (
            <div key={achievement.name} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              opacity: achievement.reached ? 1 : 0.5
            }}>
              <span style={{fontSize: '24px', marginRight: '10px'}}>{achievement.icon}</span>
              <span>{achievement.name}: {achievement.description}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  );
}; 

export default BudgetAdventureGame;