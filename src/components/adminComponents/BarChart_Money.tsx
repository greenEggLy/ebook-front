import {StatBookMoney} from "../../assets/Interface";
import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";

interface Props {
    money_data: StatBookMoney[];
    max_number: number;
    setTotalMoney?: React.Dispatch<React.SetStateAction<number>>
}

export const BarChart_Money = ({money_data, max_number, setTotalMoney}: Props) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [money, setMoney] = useState<number[]>([]);

    useEffect(() => {
        let tmp_labels: string[] = [];
        let data_: number[] = [];

        if (setTotalMoney) {
            let money = 0;
            money_data.forEach(m => money += m.money);
            setTotalMoney(money);
        }
        for (let i = 0; i < max_number && i < money_data.length; i++) {
            tmp_labels.push(money_data[i].book_name);
            data_.push(money_data[i].money);
        }
        setLabels(tmp_labels);
        setMoney(data_);
    }, [money_data, max_number]);

    const data = {
        labels: labels,
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
        <div style={{width: "90%", position: "relative"}}>
            <Bar data={data} options={options}/>
        </div>
    );
};
