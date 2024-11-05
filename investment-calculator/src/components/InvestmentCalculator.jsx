import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, CalendarDays, TrendingUp } from 'lucide-react';

const InvestmentCalculator = () => {
  const [expense, setExpense] = useState({
    amount: 5,
    frequency: 'daily',
    timeframe: 5,
    returnRate: 7
  });

  // Calculate annual expense based on frequency
  const calculateAnnualExpense = () => {
    const multiplier = {
      daily: 260, // Weekdays only
      weekly: 52,
      monthly: 12
    };
    return expense.amount * multiplier[expense.frequency];
  };

  // Calculate investment growth over years
  const calculateGrowthData = () => {
    const annualExpense = calculateAnnualExpense();
    let data = [];
    
    for (let year = 0; year <= expense.timeframe; year++) {
      const amount = annualExpense * (Math.pow(1 + (expense.returnRate / 100), year));
      data.push({
        year,
        value: parseFloat(amount.toFixed(2))
      });
    }
    return data;
  };

  const growthData = calculateGrowthData();
  const totalInvested = calculateAnnualExpense() * expense.timeframe;
  const finalValue = growthData[growthData.length - 1].value;
  const gainedInterest = finalValue - totalInvested;

  return (
    <div className="space-y-6 p-4">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Investment Potential</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Daily Expense</span>
              </label>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => setExpense({...expense, amount: parseFloat(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4" />
                <span>Investment Timeframe (Years)</span>
              </label>
              <input
                type="number"
                value={expense.timeframe}
                onChange={(e) => setExpense({...expense, timeframe: parseInt(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Expected Return Rate (%)</span>
              </label>
              <input
                type="number"
                value={expense.returnRate}
                onChange={(e) => setExpense({...expense, returnRate: parseFloat(e.target.value) || 0})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                  labelFormatter={(year) => `Year ${year}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Total Invested</p>
              <p className="text-lg font-bold">${totalInvested.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Final Value</p>
              <p className="text-lg font-bold">${finalValue.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Interest Gained</p>
              <p className="text-lg font-bold">${gainedInterest.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;