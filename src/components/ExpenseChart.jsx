import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useFetchExpenses from "../services/useFetchExpenses";

const ExpenseChart = () => {
  const chartData = useFetchExpenses();
  console.log("Chart data",chartData);
  

  return (
    <div style={{ width: "100%", height: 300, color:'black' }}>
      <h2>Expense Growth Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"  />
          <YAxis domain={[0, 100000]}/>
          <Tooltip contentStyle={{backgroundColor:'black'}}/>
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
