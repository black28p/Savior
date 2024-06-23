// Financial categories
export const allCategories = [
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

// Achievements
export const achievements = [
  { name: 'Saver Starter', description: 'Reach your savings goal', icon: '🌱', reached: false },
  { name: 'Budget Master', description: 'Stay under budget for a week', icon: '🏆', reached: false },
  { name: 'Expense Ninja', description: 'Track expenses for 5 days in a row', icon: '🥷', reached: false },
  { name: 'Category Conqueror', description: 'Stay under budget in all categories for a month', icon: '🏅', reached: false },
  { name: 'Savings Superstar', description: 'Save 20% of your income for 3 months in a row', icon: '🌟', reached: false },
];

// Months
export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Locations
export const locations = [
  'Home',
  'Work District',
  'Shopping Center',
  'Financial District',
  'Park',
  'University'
];

// Initial quests
export const initialQuests = [
  "Visit the Financial District to learn about investing",
  "Find a side hustle at the Work District"
];

// Initial game state
export const initialGameState = {
  setupStep: 0,
  incomeInput: '',
  currentLocation: 'Home',
  totalIncome: 0,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  gameStartDate: new Date().toISOString(),
  lastPlayedDate: new Date().toISOString(),
  daysPlayed: 0,
  totalSpent: 0,
  categoryInputs: {},
  selectedCategories: [],
  categories: [],
  expenses: [],
  questLog: [],
  playerAchievements: [],
  playerLevel: 1,
  score: 0,
  selectedCategory: null,
  inputAmount: '',
  message: '',
  gameStarted: false,
  streak: 0,
};

// Story templates
export const storyTemplates = {
  incomeSetup: (income) => `Great! You're starting your journey with a monthly income of $${income}. Now, let's choose your financial priorities.`,
  categorySelection: "Excellent choices! Now, let's allocate your income across these categories. Remember, balancing your budget is key to financial success!",
  gameStart: "Congratulations! You've set up your initial budget. Your adventure in Prosperity City begins now. Explore the city, complete quests, and make wise financial decisions to prosper!",
  questComplete: (level) => `Congratulations! You completed a quest and gained valuable financial experience. Your level is now ${level}!`,
  locations: {
    Home: "You're at home. It's a great place to review your budget and plan your next financial move.",
    'Work District': "Welcome to the Work District! Here you can find new job opportunities or side hustles to increase your income.",
    'Shopping Center': "You've entered the Shopping Center. Remember to stick to your budget while enjoying some retail therapy!",
    'Financial District': "Welcome to the Financial District! Here you can learn about investments and grow your wealth.",
    Park: "You're at the park. Sometimes the best things in life are free! Enjoy nature and plan your next financial move.",
    University: "Welcome to the University! Investing in your education can lead to better career opportunities and higher income."
  },
  expenses: {
    Housing: (amount) => `You spent $${amount} on housing. A comfortable home is important, but remember to balance it with other expenses.`,
    Food: (amount) => `You spent $${amount} on food. Eating well is crucial, but look for ways to save without sacrificing nutrition.`,
    Transportation: (amount) => `You spent $${amount} on transportation. Consider if there are more cost-effective ways to get around.`,
    Utilities: (amount) => `You paid $${amount} for utilities. Look into energy-saving measures to reduce these costs over time.`,
    Insurance: (amount) => `You spent $${amount} on insurance. It's a necessary expense, but shop around for the best rates.`,
    "Medical & Healthcare": (amount) => `You spent $${amount} on healthcare. Your health is wealth, but explore preventive measures to reduce costs.`,
    Savings: (amount) => `Great job! You saved $${amount}. Keep building your financial safety net.`,
    "Debt Payments": (amount) => `You paid $${amount} towards debt. Stay consistent, and you'll be debt-free before you know it!`,
    "Personal Spending": (amount) => `You spent $${amount} on personal items. It's okay to treat yourself, but make sure it aligns with your financial goals.`,
    "Recreation & Entertainment": (amount) => `You spent $${amount} on entertainment. Life is for living, but look for free or low-cost alternatives too.`,
    Clothing: (amount) => `You spent $${amount} on clothing. Style is important, but consider if you're getting the best value for your money.`,
    Education: (amount) => `You invested $${amount} in education. Knowledge is power, and this could lead to better opportunities!`,
    Childcare: (amount) => `You spent $${amount} on childcare. It's a big expense, but crucial for working parents. Look into any available subsidies or tax credits.`,
    Investments: (amount) => `You invested $${amount}. Great move! Keep an eye on your investments and diversify for long-term growth.`,
    "Gifts & Donations": (amount) => `You spent $${amount} on gifts or donations. Generosity is admirable, but ensure it fits within your budget.`,
    "Business Expenses": (amount) => `You spent $${amount} on business expenses. Investing in your business can lead to future profits, but track these expenses carefully.`,
    "Pet Care": (amount) => `You spent $${amount} on pet care. Our furry friends are important, but look for ways to save on their care when possible.`,
    Travel: (amount) => `You spent $${amount} on travel. Experiences are invaluable, but plan ahead to get the best deals.`,
    Technology: (amount) => `You spent $${amount} on technology. Stay up-to-date, but consider if each purchase is necessary and cost-effective.`,
    Subscriptions: (amount) => `You spent $${amount} on subscriptions. These can add up quickly, so regularly review if you're getting value from each one.`
  }
};

// Game constants
export const GAME_CONSTANTS = {
  MAX_CATEGORIES: 6,
  BASE_SCORE: 1000,
  QUEST_COMPLETION_SCORE: 100,
  ACHIEVEMENT_SCORE: 50,
  STREAK_BONUS: 10,
  OVERSPENDING_PENALTY: 100,
  SAVINGS_GOAL_PERCENTAGE: 0.2,
  EXPENSE_TRACKING_STREAK: 5
};

// Utility functions
export const calculateScore = (gameState) => {
  let newScore = GAME_CONSTANTS.BASE_SCORE;
  let newScoreBreakdown = { base: GAME_CONSTANTS.BASE_SCORE };

  const totalBudget = gameState.categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = gameState.expenses.reduce((sum, exp) => sum + exp.spent, 0);

  // Budget bonus
  if (totalSpent <= totalBudget) {
    const budgetBonus = Math.floor((1 - totalSpent / totalBudget) * 500);
    newScore += budgetBonus;
    newScoreBreakdown.budgetBonus = budgetBonus;
  }

  // Overspending penalty
  const overspentCategories = gameState.expenses.filter(exp => exp.spent > exp.budget);
  if (overspentCategories.length > 0) {
    const overspendingPenalty = overspentCategories.length * GAME_CONSTANTS.OVERSPENDING_PENALTY;
    newScore -= overspendingPenalty;
    newScoreBreakdown.overspendingPenalty = -overspendingPenalty;
  }

  // Streak bonus
  const streakBonus = gameState.streak * GAME_CONSTANTS.STREAK_BONUS;
  newScore += streakBonus;
  newScoreBreakdown.streakBonus = streakBonus;

  // Quest and level bonus
  const questBonus = gameState.playerLevel * GAME_CONSTANTS.QUEST_COMPLETION_SCORE;
  newScore += questBonus;
  newScoreBreakdown.questBonus = questBonus;

  return { newScore, newScoreBreakdown };
};

export const getFormattedDate = (month, year) => {
  return new Date(year, month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

export const advanceGameTime = (gameState, daysToAdvance = 1) => {
  const currentDate = new Date(gameState.currentYear, gameState.currentMonth, 1);
  currentDate.setDate(currentDate.getDate() + daysToAdvance);

  return {
    ...gameState,
    currentMonth: currentDate.getMonth(),
    currentYear: currentDate.getFullYear(),
    daysPlayed: gameState.daysPlayed + daysToAdvance,
    lastPlayedDate: currentDate.toISOString()
  };
};

export const getDaysSinceLastPlayed = (gameState) => {
  const lastPlayed = new Date(gameState.lastPlayedDate);
  const now = new Date();
  const diffTime = Math.abs(now - lastPlayed);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default {
  allCategories,
  achievements,
  months,
  locations,
  initialQuests,
  initialGameState,
  storyTemplates,
  GAME_CONSTANTS,
  calculateScore,
  getFormattedDate,
  advanceGameTime,
  getDaysSinceLastPlayed
};