import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "../../css/SubmitOrderView.css";

export const SubmitOrderView = () => {
  return (
    <div className={"submit_view"}>
      <Row className={"submit_title"}>
        <p>{"您的订单已成功提交"}</p>
      </Row>
      <Row className={"submit_subtitle"}>
        <p>{"enjoy reading :)"}</p>
      </Row>
      <Row>
        <Col span={5} />
        <Col span={3}>
          <Link className={"to_order"} to={"/order"}>
            <p>{"点此查看订单页"}</p>
          </Link>
        </Col>
        <Col span={8} />
        <Col span={8}>
          <Link className={"to_order"} to={"/booklist"}>
            <p>{"点此返回主页"}</p>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
