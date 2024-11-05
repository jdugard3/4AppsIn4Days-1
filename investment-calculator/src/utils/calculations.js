export const calculateInvestment = (amount, frequency, years, rate) => {
    const annualAmount = getAnnualAmount(amount, frequency);
    const futureValue = annualAmount * Math.pow(1 + (rate / 100), years);
    return {
      futureValue,
      totalInvested: annualAmount * years,
      gainedInterest: futureValue - (annualAmount * years)
    };
  };
  
  export const getAnnualAmount = (amount, frequency) => {
    const multipliers = {
      daily: 260,  // Weekdays only
      weekly: 52,
      monthly: 12
    };
    return amount * multipliers[frequency];
  };