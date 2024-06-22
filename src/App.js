import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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

const FinancialAdventureGame = () => {
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
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem('currentLocation') || 'Home';
  });
  const [questLog, setQuestLog] = useState(() => {
    const saved = localStorage.getItem('questLog');
    return saved ? JSON.parse(saved) : [];
  });
  const [playerLevel, setPlayerLevel] = useState(() => {
    return parseInt(localStorage.getItem('playerLevel') || '1');
  });
  const [story, setStory] = useState(() => {
    return localStorage.getItem('story') || 'Welcome to Prosperity City! Your financial adventure begins...';
  });

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
    localStorage.setItem('currentLocation', currentLocation);
    localStorage.setItem('questLog', JSON.stringify(questLog));
    localStorage.setItem('playerLevel', playerLevel.toString());
    localStorage.setItem('story', story);
  }, [totalIncome, gameStarted, setupStep, selectedCategories, categories, expenses, score, scoreBreakdown, streak, lastPlayDate, playerAchievements, currentMonth, currentYear, currentLocation, questLog, playerLevel, story]);

  const handleIncomeSubmit = () => {
    const income = parseFloat(incomeInput);
    if (!isNaN(income) && income > 0) {
      setTotalIncome(income);
      setSetupStep(1);
      setStory(`Great! You're starting your journey with a monthly income of $${income}. Now, let's choose your financial priorities.`);
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
      setStory("Excellent choices! Now, let's allocate your income across these categories. Remember, balancing your budget is key to financial success!");
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
    setStory("Congratulations! You've set up your initial budget. Your adventure in Prosperity City begins now. Explore the city, complete quests, and make wise financial decisions to prosper!");
    addQuest("Visit the Financial District to learn about investing");
    addQuest("Find a side hustle at the Work District");
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
      updateStoryBasedOnExpense(selectedCategory.name, amount);
      checkAchievements();
      calculateScore();
    } else {
      setMessage('Please select a category and enter a valid amount');
    }
  };

  const handleEditExpense = (categoryName, newAmount) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(exp =>
        exp.name === categoryName
          ? { ...exp, spent: parseFloat(newAmount) }
          : exp
      )
    );
    setTotalSpent(prev => prev - expenses.find(exp => exp.name === categoryName).spent + parseFloat(newAmount));
    setMessage(`Updated expense for ${categoryName}`);
    checkAchievements();
    calculateScore();
  };

  const handleDeleteExpense = (categoryName) => {
    const expenseToDelete = expenses.find(exp => exp.name === categoryName);
    setExpenses(prevExpenses => prevExpenses.map(exp =>
      exp.name === categoryName ? { ...exp, spent: 0 } : exp
    ));
    setTotalSpent(prev => prev - expenseToDelete.spent);
    setMessage(`Deleted expense for ${categoryName}`);
    checkAchievements();
    calculateScore();
  };

  const handleLocationChange = (newLocation) => {
    setCurrentLocation(newLocation);
    updateStoryBasedOnLocation(newLocation);
  };

  const addQuest = (quest) => {
    setQuestLog(prev => [...prev, quest]);
  };

  const completeQuest = (questIndex) => {
    setQuestLog(prev => prev.filter((_, index) => index !== questIndex));
    setPlayerLevel(prev => prev + 1);
    setScore(prev => prev + 100);
    setStory(`Congratulations! You completed a quest and gained valuable financial experience. Your level is now ${playerLevel + 1}!`);
  };

  const updateStoryBasedOnLocation = (location) => {
    switch(location) {
      case 'Home':
        setStory("You're at home. It's a great place to review your budget and plan your next financial move.");
        break;
      case 'Work District':
        setStory("Welcome to the Work District! Here you can find new job opportunities or side hustles to increase your income.");
        addQuest("Apply for a promotion or find a better-paying job");
        break;
      case 'Shopping Center':
        setStory("You've entered the Shopping Center. Remember to stick to your budget while enjoying some retail therapy!");
        addQuest("Find a great deal and save money on a purchase");
        break;
      case 'Financial District':
        setStory("Welcome to the Financial District! Here you can learn about investments and grow your wealth.");
        addQuest("Open a high-yield savings account");
        break;
      case 'Park':
        setStory("You're at the park. Sometimes the best things in life are free! Enjoy nature and plan your next financial move.");
        break;
      case 'University':
        setStory("Welcome to the University! Investing in your education can lead to better career opportunities and higher income.");
        addQuest("Take a free online course to improve your skills");
        break;
      default:
        setStory("You're exploring Prosperity City. What financial adventures await you today?");
    }
  };

  const updateStoryBasedOnExpense = (category, amount) => {
    const stories = {
      Housing: `You spent $${amount} on housing. A comfortable home is important, but remember to balance it with other expenses.`,
      Food: `You spent $${amount} on food. Eating well is crucial, but look for ways to save without sacrificing nutrition.`,
      Transportation: `You spent $${amount} on transportation. Consider if there are more cost-effective ways to get around.`,
      Utilities: `You paid $${amount} for utilities. Look into energy-saving measures to reduce these costs over time.`,
      Insurance: `You spent $${amount} on insurance. It's a necessary expense, but shop around for the best rates.`,
      "Medical & Healthcare": `You spent $${amount} on healthcare. Your health is wealth, but explore preventive measures to reduce costs.`,
      Savings: `Great job! You saved $${amount}. Keep building your financial safety net.`,
      "Debt Payments": `You paid $${amount} towards debt. Stay consistent, and you'll be debt-free before you know it!`,
      "Personal Spending": `You spent $${amount} on personal items. It's okay to treat yourself, but make sure it aligns with your financial goals.`,
      "Recreation & Entertainment": `You spent $${amount} on entertainment. Life is for living, but look for free or low-cost alternatives too.`,
      Clothing: `You spent $${amount} on clothing. Style is important, but consider if you're getting the best value for your money.`,
      Education: `You invested $${amount} in education. Knowledge is power, and this could lead to better opportunities!`,
      Childcare: `You spent $${amount} on childcare. It's a big expense, but crucial for working parents. Look into any available subsidies or tax credits.`,
      Investments: `You invested $${amount}. Great move! Keep an eye on your investments and diversify for long-term growth.`,
      "Gifts & Donations": `You spent $${amount} on gifts or donations. Generosity is admirable, but ensure it fits within your budget.`,
      "Business Expenses": `You spent $${amount} on business expenses. Investing in your business can lead to future profits, but track these expenses carefully.`,
      "Pet Care": `You spent $${amount} on pet care. Our furry friends are important, but look for ways to save on their care when possible.`,
      Travel: `You spent $${amount} on travel. Experiences are invaluable, but plan ahead to get the best deals.`,
      Technology: `You spent $${amount} on technology. Stay up-to-date, but consider if each purchase is necessary and cost-effective.`,
      Subscriptions: `You spent $${amount} on subscriptions. These can add up quickly, so regularly review if you're getting value from each one.`
    };
    setStory(stories[category] || `You spent $${amount} on ${category}. Keep track of your expenses to stay within your budget.`);
  };

  const checkAchievements = () => {
    const newAchievements = playerAchievements.map(achievement => {
      if (achievement.name === 'Saver Starter' && !achievement.reached && 
          expenses.find(exp => exp.name === 'Savings')?.spent >= categories.find(cat => cat.name === 'Savings')?.budget) {
        return { ...achievement, reached: true };
      }
      if (achievement.name === 'Budget Master' && !achievement.reached && 
          expenses.every(exp => exp.spent <= exp.budget)) {
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
    const newlyReached = newAchievements.filter(a => a.reached && !playerAchievements.find(pa => pa.name === a.name).reached);
    if (newlyReached.length > 0) {
      setStory(`Congratulations! You've earned the "${newlyReached[0].name}" achievement: ${newlyReached[0].description}`);
      setScore(prev => prev + 50 * newlyReached.length);
    }
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

    // Bonus for completed quests and player level
    const questBonus = playerLevel * 50;
    newScore += questBonus;
    newScoreBreakdown.questBonus = questBonus;

    setScore(newScore);
    setScoreBreakdown(newScoreBreakdown);
  };

  const handleResetGame = () => {
    if (window.confirm("Are you sure you want to reset the game? All progress will be lost.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {!gameStarted ? (
          <div className="font-sans">
            <h1 className="text-3xl font-bold text-center mb-6">Financial Adventure: Road to Prosperity</h1>
            {setupStep === 0 && (
              <>
                <p className="mb-4">Welcome, adventurer! Before you begin your journey in Prosperity City, let's set up your initial finances.</p>
                <input
                  type="number"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  placeholder="Enter your starting monthly income"
                  className="w-full p-2 mb-4 border rounded"
                />
                <button
                  onClick={handleIncomeSubmit}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Set Starting Income
                </button>
              </>
            )}
            {setupStep === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Select up to 6 Financial Categories</h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {allCategories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => handleCategorySelection(category)}
                      className={`p-2 rounded ${
                        selectedCategories.includes(category) 
                          ? `bg-${category.color} text-white` 
                          : 'bg-gray-200'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCategorySelectionComplete}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Continue to Budget Allocation
                </button>
              </>
            )}
            {setupStep === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Allocate Your Monthly Budget</h2>
                {selectedCategories.map(cat => (
                  <div key={cat.name} className="mb-4">
                    <label className="block mb-2">{cat.name}</label>
                    <input
                      type="number"
                      value={categoryInputs[cat.name]}
                      onChange={(e) => handleCategoryBudgetChange(cat.name, e.target.value)}
                      placeholder={`Enter budget for ${cat.name}`}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  onClick={handleCategoryBudgetsSubmit}
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Start Your Financial Adventure!
                </button>
              </>
            )}
            <div className="text-center mt-4 text-gray-600">{message}</div>
          </div>
        ) : (
          <div className="font-sans">
            <h1 className="text-3xl font-bold text-center mb-6">Financial Adventure: Road to Prosperity</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-2">Your Financial Journey</h2>
                <p className="bg-gray-100 p-4 rounded">{story}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Player Stats</h2>
                <p>Level: {playerLevel}</p>
                <p>Location: {currentLocation}</p>
                <p>Score: {score} 🌟</p>
                <p>Streak: {streak} days 🔥</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
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
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Prosperity City Map</h2>
              <div className="grid grid-cols-3 gap-2">
                {['Home', 'Work District', 'Shopping Center', 'Financial District', 'Park', 'University'].map(location => (
                  <button
                    key={location}
                    onClick={() => handleLocationChange(location)}
                    className={`p-2 rounded ${currentLocation === location ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Budget Management</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categories.map(category => (
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
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Expense Summary</h2>
              {expenses.map(exp => (
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Achievements</h2>
              <div className="grid grid-cols-2 gap-2">
                {playerAchievements.map(achievement => (
                  <div key={achievement.name} className={`flex items-center p-2 bg-gray-100 rounded ${achievement.reached ? 'opacity-100' : 'opacity-50'}`}>
                    <span className="text-2xl mr-2">{achievement.icon}</span>
                    <div>
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-sm">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleResetGame}
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAdventureGame;