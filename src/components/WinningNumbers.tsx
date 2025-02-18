import React from 'react';
import { Trophy } from 'lucide-react';

// This would typically come from an API
const latestWinningNumbers = {
  date: "March 16, 2024",
  mainNumbers: [7, 12, 23, 34, 38, 45],
  bonusNumber: 19,
  jackpot: "$5,000,000"
};

export function WinningNumbers() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-yellow-100 p-3 rounded-full">
          <Trophy className="h-6 w-6 text-yellow-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">Latest Winning Numbers</h2>
          <p className="text-gray-600">{latestWinningNumbers.date}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {latestWinningNumbers.mainNumbers.map((number, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600"
          >
            {number}
          </div>
        ))}
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600">
          {latestWinningNumbers.bonusNumber}
        </div>
      </div>

      <div className="text-gray-600">
        <span className="font-semibold">Next Jackpot:</span> {latestWinningNumbers.jackpot}
      </div>
    </div>
  );
}