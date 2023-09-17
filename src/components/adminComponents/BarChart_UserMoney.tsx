import {IStatUserMoney} from "../../assets/Interface";
import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";

interface Props {
    stat_data: IStatUserMoney[];
    max_number: number;
}

export const BarChart_UserMoney = ({stat_data, max_number}: Props) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [money, setMoney] = useState<number[]>([]);

    useEffect(() => {
        let tmp_labels: string[] = [];
        let data_: number[] = [];
        for (let i = 0; i < max_number && i < stat_data.length; i++) {
            tmp_labels.push(stat_data[i].username);
            data_.push(stat_data[i].money);
        }
        setLabels(tmp_labels);
        setMoney(data_);
    }, [stat_data, max_number]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "购买金额",
                data: money,
                borderColor: "rgb(90,157,22)",
                backgroundColor: "rgba(114,168,63,0.5)",
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
                text: "用户购买榜",
            },
        },
    };

    return (
        <div style={{width: "90%", position: "relative"}}>
            <Bar data={data} options={options}/>
        </div>
    );
};
