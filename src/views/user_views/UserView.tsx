import {
  Avatar,
  Button,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CartItem, backMsg, User } from "../../Interface";
import "../../css/UserView.css";
import { UserCartList } from "../../components/UserCartList";
import { Link, useNavigate } from "react-router-dom";
import {
  get_user,
  getUser,
  mod_user_about,
  mod_user_name,
  mode_user_uinfo,
} from "../../services/UserService";
import { check_session } from "../../services/LoginService";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { get_cart_by_user } from "../../services/CartService";

const { Title } = Typography;
const { Panel } = Collapse;

interface Props {
  user: User;
}

export const UserView = () => {
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const [user, setUser] = useState<User>(emptyUser);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        get_user(msg_ref.current.data.userId, (user: User) =>
          setUser(user)
        ).catch((err) => console.error(err));
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);
  useEffect(() => {
    if (user.id) {
      get_cart_by_user(user.id, (data: CartItem[]) => setCart(data)).catch(
        (err) => console.error(err)
      );
    }
  });

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
              let email = form.getFieldValue(["email"]);
              let avatar = form.getFieldValue(["avatar"]);
              if (
                username !== user.name ||
                about !== user.about ||
                email !== user.email ||
                avatar !== user.avatar
              ) {
                mode_user_uinfo(user.id, username, avatar, about, email)
                  .then(() => setOpen(false))
                  .then(() => window.location.reload());
              } else {
                setOpen(false);
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
              <Form.Item
                className={"form_item"}
                name={"email"}
                label={"邮箱"}
                initialValue={user.email}
              >
                <Input className={"form_input"} />
              </Form.Item>
              <Form.Item
                className={"form_item"}
                name={"avatar"}
                label={"头像"}
                initialValue={user.avatar}
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
              <UserCartList cartList={cart} />
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  else return <></>;
};
