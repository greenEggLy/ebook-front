import {
  Avatar,
  Button,
  Col,
  Collapse,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useState } from "react";
import { User } from "../Interface";
import "../css/UserView.css";
import { UserBoughtList, UserCartList } from "../components/UserCartList";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Panel } = Collapse;

interface Props {
  user: User;
}

export const UserView = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={"user_view"}>
      <div className={"user_profile"}>
        <Title>{"用户信息"}</Title>
        <Row>
          <Col className={"pic_info"} span={4}>
            <Avatar size={90} src={user.avatar} />
          </Col>
          <Col className={"text_info"} span={16}>
            <Row className={"user_name"}>
              <p>{user.name}</p>
            </Row>
            <Row className={"user_about"}>
              <p>{user.about_me}</p>
            </Row>
          </Col>
          <Col className={"change_info"} span={4}>
            <Row className={"row"} justify={"center"}>
              <Button className={"button"} onClick={() => setOpen(true)}>
                {"更改信息"}
              </Button>
            </Row>
            <Row className={"row"} justify={"center"}>
              <Link to={"/login"}>
                <Button className={"button"}>{"登出"}</Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
      <div className={"modal_info"}>
        <Modal
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Form className={"modal_form"}>
            <Form.Item
              className={"form_item"}
              name={"name"}
              label={"用户名"}
              initialValue={user.name}
              required={true}
            >
              <Input className={"form_input"} />
            </Form.Item>
            <Form.Item
              className={"form_item"}
              name={"about_me"}
              label={"签名"}
              initialValue={user.about_me}
            >
              <Input className={"form_input"} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className={"user_buy"}>
        <Title>{"购买信息"}</Title>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="my cart" key="1">
            <UserCartList cartList={user.cart} />
          </Panel>
          {/*<Panel header="my bought" key="2">*/}
          {/*  <UserBoughtList cartList={user.bought} />*/}
          {/*</Panel>*/}
        </Collapse>
      </div>
    </div>
  );
};
