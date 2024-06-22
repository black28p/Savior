import React from 'react';
import FinancialAdventureGame from './components/FinancialAdventureGame';

function App() {
  React.useEffect(() => {
    // Set the title
    document.title = 'Financial Adventure Game';

    // Add viewport meta tag
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(viewportMeta);

    // Add theme-color meta tag
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#1a202c';
    document.head.appendChild(themeColorMeta);

    // Cleanup function
    return () => {
      document.head.removeChild(viewportMeta);
      document.head.removeChild(themeColorMeta);
    };
  }, []);

  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <FinancialAdventureGame />
      </div>
    </div>
  );
}

export default App;