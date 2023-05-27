import { Order } from "../../assets/Interface";
import React from "react";
import { Table, TableColumnsType } from "antd";

interface Props {
  all_order: Order[];
  order_columns: any;
}

export const NestTable = ({ all_order, order_columns }: Props) => {
  const InnerTable = (order: Order) => {
    return (
      <Table
        size={"small"}
        pagination={{ pageSize: 10 }}
        columns={order_columns}
        dataSource={order.items}
      />
    );
  };

  const outer_column: TableColumnsType<Order> = [
    {
      title: "购买时间",
      dataIndex: "time",
    },
    {
      title: "总价",
      render: (value, record, index) => {
        let p = 0;
        record.items.forEach((item) => (p += item.price * item.number));
        return <p>{p}</p>;
      },
    },
  ];

  return (
    <Table
      columns={outer_column}
      dataSource={all_order}
      rowKey={"id"}
      expandable={{
        expandedRowRender: (record, index, indent, expanded) => {
          if (expanded)
            return (
              <InnerTable
                id={record.id}
                items={record.items}
                time={record.time}
                buyer={record.buyer}
              />
            );
        },
      }}
    />
  );
};
