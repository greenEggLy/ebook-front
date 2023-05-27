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
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { CartItem, Msg, User } from "../../assets/Interface";
import "../../css/UserView.css";
import { UserCartList } from "../../components/userComponents/UserCartList";
import { Link, useNavigate } from "react-router-dom";
import {
  GetUser,
  ModUserAvatar,
  ModUserInfo_USER,
} from "../../services/UserService";
import { CheckSession } from "../../services/LoginService";
import { EmptyUser } from "../../assets/data/emptyData";
import { GetUserCart } from "../../services/CartService";
import { UploadOutlined } from "@ant-design/icons";
import { UploadImg } from "../../services/ImageService";
import { getImgPath } from "../../utils/imgPathUtil";
import { sessionCheck } from "../../utils/sessionUtil";
import { validateEmail } from "../../utils/EmalRegexUtil";

const { Title } = Typography;
const { Panel } = Collapse;

export const UserView = () => {
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const [user, setUser] = useState<User>(EmptyUser);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [, setUploading] = useState(false);

  useEffect(() => {
    CheckSession().then((msg) => {
      let status = sessionCheck(msg);
      if (!status.ok)
        message.error(status.msg, 1).then(() => navigation(status.path));
      else {
        GetUser(msg.data.id).then((usr) => setUser(usr));
        GetUserCart(msg.data.id).then((cart) => {
          setCart(cart);
        });
      }
    });
  }, [navigation]);

  const uploadProps: UploadProps = {
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("请选择图片", 1);
      return;
    }
    setUploading(true);
    const response = await UploadImg(fileList[0]);
    await ModUserAvatar(user.id, response.data.path);
    setUploading(false);
    setFileList([]);
    setUser({ ...user, avatar: response.data.path });
  };

  if (user)
    return (
      <div className={"user_view"}>
        <div className={"user_profile"}>
          <Title>{"用户信息"}</Title>
          <Row>
            <Col className={"pic_info"} span={4}>
              <Avatar size={90} src={getImgPath(user.avatar)} />
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
            onOk={async () => {
              let username = form.getFieldValue(["username"]);
              let about = form.getFieldValue(["about"]);
              let email = form.getFieldValue(["email"]);
              if (!validateEmail(email)) {
                message.error("请输入合法邮箱");
                return;
              }
              if (
                username !== user.name ||
                about !== user.about ||
                email !== user.email
              ) {
                const response = await ModUserInfo_USER(
                  user.id,
                  username,
                  about,
                  email
                );
                if (!response.ok) {
                  message.error("修改失败", 1);
                  return;
                }
                const msg: Msg = await response.json();
                if (msg.status !== 0) {
                  message.error(msg.msg, 1);
                  return;
                }
                setUser({
                  ...user,
                  name: username,
                  email: email,
                  about: about,
                });
                setOpen(false);
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
                required
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
                required
              >
                <Input className={"form_input"} />
              </Form.Item>
            </Form>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Button title={"上传头像"} onClick={handleUpload}>
              {"上传头像"}
            </Button>
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
