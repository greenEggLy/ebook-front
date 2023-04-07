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
import React, { useEffect, useMemo, useState } from "react";
import { User } from "../../Interface";
import "../../css/UserView.css";
import { UserCartList } from "../../components/UserCartList";
import { Link, useNavigate } from "react-router-dom";
import { getUser, modUserAbout, modUserName } from "../../services/UserService";
import { useForm } from "antd/es/form/Form";

const { Title } = Typography;
const { Panel } = Collapse;

interface Props {
  user: User;
}

export const UserView = () => {
  const navigation = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getUser((data: React.SetStateAction<User | undefined>) =>
      setUser(data)
    ).catch(console.error);
  }, []);
  if (user)
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
                <p>{user.about}</p>
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
            onOk={() => {
              let username = form.getFieldValue(["username"]);
              let about = form.getFieldValue(["about"]);
              if (username !== user.name || about !== user.about) {
                modUserName(user.id, username)
                  .then(() => {
                    modUserAbout(user.id, about);
                  })
                  .then(() => setOpen(false))
                  .then(() => window.location.reload());
              }
            }}
            onCancel={() => setOpen(false)}
          >
            <Form className={"modal_form"} form={form}>
              <Form.Item
                className={"form_item"}
                name={"username"}
                label={"用户名"}
                initialValue={user.name}
                required={true}
              >
                <Input className={"form_input"} />
              </Form.Item>
              <Form.Item
                className={"form_item"}
                name={"about"}
                label={"签名"}
                initialValue={user.about}
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
          </Collapse>
        </div>
      </div>
    );
  else return <></>;
};
