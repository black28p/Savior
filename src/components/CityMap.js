import React from 'react';

const locations = ['Home', 'Work District', 'Shopping Center', 'Financial District', 'Park', 'University'];

const CityMap = ({ gameState, setGameState }) => {
  const handleLocationChange = (newLocation) => {
    setGameState(prevState => ({
      currentLocation: newLocation,
      story: updateStoryBasedOnLocation(newLocation)
    }));
  };

  const updateStoryBasedOnLocation = (location) => {
    // This function should be moved to a utility file in a real application
    switch(location) {
      case 'Home':
        return "You're at home. It's a great place to review your budget and plan your next financial move.";
      case 'Work District':
        return "Welcome to the Work District! Here you can find new job opportunities or side hustles to increase your income.";
      case 'Shopping Center':
        return "You've entered the Shopping Center. Remember to stick to your budget while enjoying some retail therapy!";
      case 'Financial District':
        return "Welcome to the Financial District! Here you can learn about investments and grow your wealth.";
      case 'Park':
        return "You're at the park. Sometimes the best things in life are free! Enjoy nature and plan your next financial move.";
      case 'University':
        return "Welcome to the University! Investing in your education can lead to better career opportunities and higher income.";
      default:
        return "You're exploring Prosperity City. What financial adventures await you today?";
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Prosperity City Map</h2>
      <div className="grid grid-cols-3 gap-2">
        {locations.map(location => (
          <button
            key={location}
            onClick={() => handleLocationChange(location)}
            className={`p-2 rounded ${gameState.currentLocation === location ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {location}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityMap;