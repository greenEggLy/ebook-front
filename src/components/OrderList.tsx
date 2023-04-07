import { OrderItem, Order } from "../Interface";
import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
  order: Order;
  order_columns: ColumnsType<OrderItem>;
}

export const OrderList = ({ order, order_columns }: Props) => {
  let p = 0;
  const calPrice = () => {
    order.items.map((item) => (p += item.number * item.book.price));
  };
  calPrice();
  return (
    <>
      <Row>
        <Col span={4}>
          <b>{"购买时间：" + order.time}</b>
        </Col>
        <b>{"总价: " + p.toString()}</b>
      </Row>
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
