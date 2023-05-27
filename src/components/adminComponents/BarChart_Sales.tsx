import { StatBookSales } from "../../assets/Interface";
import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  sales_data: StatBookSales[];
  max_number: number;
}

const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "销量统计",
    },
  },
};
export const BarChart_Sales = ({ sales_data, max_number }: Props) => {
  const [labels_, setLabels] = useState<string[]>([]);
  const [data_, setData] = useState<number[]>([]);
  useEffect(() => {
    let tmp_labels: string[] = [];
    let tmp_data: number[] = [];
    for (let i = 0; i < max_number && i < sales_data.length; i++) {
      tmp_labels.push(sales_data[i].book_name);
      tmp_data.push(sales_data[i].sales);
    }
    setLabels(tmp_labels);
    setData(tmp_data);
  }, [max_number, sales_data]);

  const data = {
    labels: labels_,
    datasets: [
      {
        label: "销量",
        data: data_,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div style={{ width: "90%", position: "relative" }}>
      <Bar data={data} options={options} />
    </div>
  );
};
