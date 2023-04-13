import { Stat_Money, Stat_Sales } from "../Interface";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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
  sales_data: Stat_Sales[];
  max_number: number;
}

export const BarChart_Sales = ({ sales_data, max_number }: Props) => {
  let labels: string[] = [];
  let data_: number[] = [];
  for (let i = 0; i < max_number && i < sales_data.length; i++) {
    labels.push(sales_data[i].bookName);
    data_.push(sales_data[i].sales);
  }
  labels = ["1", "2", "3", "4", "5"];
  data_ = [3, 12, 4, 9, 5];
  const data = {
    label: labels,
    datasets: [
      {
        label: "销量",
        data: data_,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
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

  return (
    <div style={{ width: "60%", position: "relative" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

interface Props_2 {
  money_data: Stat_Money[];
  max_number: number;
}

export const BarChart_Money = ({ money_data, max_number }: Props_2) => {
  let tmp_labels: string[] = [];
  let data_: number[] = [];
  const [labels, setLabels] = useState<string[]>([]);
  const [money, setMoney] = useState<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < max_number && i < money_data.length; i++) {
      tmp_labels.push(money_data[i].bookName);
      data_.push(money_data[i].money);
    }
    setLabels(tmp_labels);
    setMoney(data_);
    console.table(labels);
    console.table(money);
  }, [money_data, max_number]);

  const data = {
    label: labels,
    datasets: [
      {
        label: "销售额",
        data: money,
        borderColor: "rgb(22,105,157)",
        backgroundColor: "rgba(63,144,168,0.5)",
      },
    ],
  };
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
        text: "销售额统计",
      },
    },
  };

  return (
    <div style={{ width: "60%", position: "relative" }}>
      <Bar data={data} options={options} />
    </div>
  );
};
