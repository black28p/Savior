import React from 'react';

const locations = ['Home', 'Work District', 'Shopping Center', 'Financial District', 'Park', 'University'];

const CityMap = ({ gameState, updateGameState }) => {
  const handleLocationChange = (newLocation) => {
    updateGameState(prevState => ({
      ...prevState,
      currentLocation: newLocation,
      story: updateStoryBasedOnLocation(newLocation).story
    }));
  };

  const updateStoryBasedOnLocation = (location) => {
    switch(location) {
      case 'Home':
        return {
          story: "You're at home. It's a great place to review your budget and plan your next financial move.",
          advice: "Take time to regularly review your budget and financial goals. Consider using budgeting apps or spreadsheets to track your expenses.",
          resources: [
            { text: "Budgeting 101", url: "https://www.consumerfinance.gov/about-us/blog/budgeting-how-to-create-a-budget-and-stick-with-it/" },
            { text: "Top Budgeting Apps", url: "https://www.nerdwallet.com/article/finance/best-budget-apps" }
          ]
        };
      case 'Work District':
        return {
          story: "Welcome to the Work District! Here you can find new job opportunities or side hustles to increase your income.",
          advice: "Always be on the lookout for ways to increase your income. This could be through asking for a raise, finding a better job, or starting a side hustle.",
          resources: [
            { text: "Negotiating Salary", url: "https://www.indeed.com/career-advice/pay-salary/how-to-negotiate-salary" },
            { text: "Side Hustle Ideas", url: "https://getschooled.com/article/5775-10-side-hustle-sites-you-should-know-about/" }
          ]
        };
      case 'Shopping Center':
        return {
          story: "You've entered the Shopping Center. Remember to stick to your budget while enjoying some retail therapy!",
          advice: "Before making a purchase, ask yourself if it's a need or a want. Look for deals and discounts, but don't buy something just because it's on sale.",
          resources: [
            { text: "Smart Shopping Tips", url: "https://www.consumerreports.org/shopping/how-to-be-a-smarter-shopper-right-now/" },
            { text: "Product Reviews", url: "https://www.consumerreports.org/cro/a-to-z-index/products/index.htm" }
          ]
        };
      case 'Financial District':
        return {
          story: "Welcome to the Financial District! Here you can learn about investments and grow your wealth.",
          advice: "Start investing early and regularly. Remember, diversification is key to managing risk.",
          resources: [
            { text: "Investing Basics", url: "https://www.investor.gov/introduction-investing" },
            { text: "Understanding Risk", url: "https://www.finra.org/investors/learn-to-invest/key-investing-concepts/risk" }
          ]
        };
      case 'Park':
        return {
          story: "You're at the park. Sometimes the best things in life are free! Enjoy nature and plan your next financial move.",
          advice: "Remember that many enjoyable activities don't cost money. Balance your financial goals with activities that bring you joy.",
          resources: [
            { text: "Free Entertainment Ideas", url: "https://www.nerdwallet.com/article/finance/free-cheap-things-to-do" },
            { text: "Money and Happiness Research", url: "https://www.pnas.org/doi/full/10.1073/pnas.2301893120" }
          ]
        };
      case 'University':
        return {
          story: "Welcome to the University! Investing in your education can lead to better career opportunities and higher income.",
          advice: "Education can be a great investment, but consider the return on investment. Look into scholarships, grants, and affordable education options.",
          resources: [
            { text: "Scholarship Search", url: "https://studentaid.gov/understand-aid/types/scholarships" },
            { text: "ROI of Education", url: "https://www.bls.gov/careeroutlook/2018/data-on-display/education-pays.htm" }
          ]
        };
      default:
        return {
          story: "You're exploring Prosperity City. What financial adventures await you today?",
          advice: "Every financial decision is an opportunity to learn and grow. Stay curious and keep exploring!",
          resources: [
            { text: "Personal Finance Basics", url: "https://www.investopedia.com/personal-finance-4427760" }
          ]
        };
    }
  };

  return (
    <div className="mb-6 text-white bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-200">Prosperity City Map</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {locations.map(location => (
          <button
            key={location}
            onClick={() => handleLocationChange(location)}
            className={`p-3 rounded text-sm sm:text-base ${
              gameState.currentLocation === location 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {location}
          </button>
        ))}
      </div>
      {gameState.currentLocation && (
        <div className="mt-4">
          <p className="mb-2">{updateStoryBasedOnLocation(gameState.currentLocation).story}</p>
          <p className="mb-2 text-yellow-300">{updateStoryBasedOnLocation(gameState.currentLocation).advice}</p>
          <div className="text-sm">
            <p className="mb-1">Helpful resources:</p>
            <ul className="list-disc list-inside">
              {updateStoryBasedOnLocation(gameState.currentLocation).resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-300 hover:underline"
                  >
                    {resource.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityMap;