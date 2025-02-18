export interface LotteryNumbers {
  mainNumbers: number[];
  bonusNumber: number;
}

export function generateRandomNumbers(): LotteryNumbers {
  const mainNumbers: number[] = [];
  
  // Generate 6 unique main numbers between 1 and 49
  while (mainNumbers.length < 6) {
    const num = Math.floor(Math.random() * 49) + 1;
    if (!mainNumbers.includes(num)) {
      mainNumbers.push(num);
    }
  }
  
  // Sort numbers in ascending order
  mainNumbers.sort((a, b) => a - b);
  
  // Generate bonus number (ensuring it's not in main numbers)
  let bonusNumber: number;
  do {
    bonusNumber = Math.floor(Math.random() * 49) + 1;
  } while (mainNumbers.includes(bonusNumber));
  
  return {
    mainNumbers,
    bonusNumber
  };
}