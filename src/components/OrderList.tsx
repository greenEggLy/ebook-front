import { Good, Order } from "../Interface";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
  order: Order;
  order_columns: ColumnsType<Good>;
}

export const OrderList = ({ order, order_columns }: Props) => {
  return (
    <>
      <b>{"购买时间：" + order.time.getDate()}</b>
      <Table
        className={"order_table"}
        size={"small"}
        pagination={{ pageSize: 10 }}
        columns={order_columns}
        dataSource={order.items}
      ></Table>
    </>
  );
};
