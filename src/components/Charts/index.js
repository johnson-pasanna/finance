import React from "react";
import { Line } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
  };

  let chart;
  return (
    <div>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
    </div>
  );
}

export default ChartComponent;
