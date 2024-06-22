import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('State on mount:', {
      totalIncome,
      gameStarted,
      setupStep,
    });
    localStorage.setItem('totalIncome', totalIncome.toString());
    localStorage.setItem('gameStarted', gameStarted.toString());
    localStorage.setItem('setupStep', setupStep.toString());
  }, [totalIncome, gameStarted, setupStep]);

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

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <Card className="max-w-4xl w-full">
        <CardContent>
          {!gameStarted ? (
            <div className="font-sans">
              <CardHeader>
                <h1 className="text-3xl font-bold text-center">Financial Adventure: Road to Prosperity</h1>
              </CardHeader>
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
              <div className="text-center mt-4 text-gray-600">{message}</div>
            </div>
          ) : (
            <div className="font-sans">
              <CardHeader>
                <h1 className="text-3xl font-bold text-center">Financial Adventure: Road to Prosperity</h1>
              </CardHeader>
              {/* Render other components based on gameStarted */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAdventureGame;
