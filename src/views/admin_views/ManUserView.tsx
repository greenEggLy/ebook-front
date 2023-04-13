import {
  Badge,
  Col,
  Input,
  List,
  message,
  Modal,
  Radio,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { OrderSearch, UserSearch } from "../../components/SearchBar";
import { ManUserInfo, OrderItem, backMsg, User } from "../../Interface";
import {
  get_all_users,
  get_user_info,
  getUser,
  mod_user_info,
} from "../../services/UserService";
import { ColumnsType } from "antd/es/table";
import { Text } from "recharts";
import { check_session } from "../../services/LoginService";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const emptyData: ManUserInfo = {
  id: -1,
  username: "",
  email: "",
  is_admin: false,
  is_blocked: true,
};

export const ManUserView = () => {
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const navigation = useNavigate();

  const [user, setUser] = useState<User>(emptyUser);
  const [allUsers, setAllUsers] = useState<ManUserInfo[]>([]);
  const [filterUsers, setFilterUsers] = useState<ManUserInfo[]>([]);
  const [modalData, setModalData] = useState<ManUserInfo>(emptyData);
  const [name_input, set_name_input] = useState<string>("");
  const [email_input, set_email_input] = useState<string>("");
  const [is_admin, set_is_admin] = useState<boolean>(false);
  const [is_blocked, set_is_blocked] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        if (msg_ref.current.data.userType < 1)
          message.error("没有管理员权限！").then(() => navigation("/"));
        else {
          get_all_users((data: ManUserInfo[]) => {
            setAllUsers(data);
            setFilterUsers(data);
          }).catch((err) => console.error(err));
        }
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  // useEffect(() => {
  //   get_all_users((data: ManUserInfo[]) => {
  //     setAllUsers(data);
  //     setFilterUsers(data);
  //   }).catch((err) => console.error(err));
  // }, []);

  const man_user_columns: ColumnsType<ManUserInfo> = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: "15%",
    },
    {
      title: "权限",
      dataIndex: "is_admin",
      key: "admin",
      width: "15%",
      render: (_, record) => {
        if (record.is_admin) return <Badge status={"success"} text={"admin"} />;
        else return <Badge status={"default"} text={"user"} />;
      },
    },
    {
      title: "状态",
      dataIndex: "is_blocked",
      key: "block",
      width: "15%",
      render: (_, record) => {
        if (!record.is_blocked) return <Badge status={"success"} text={"ok"} />;
        else return <Badge status={"error"} text={"blocked"} />;
      },
    },
  ];

  const handleRow = (record: ManUserInfo) => {
    return {
      onClick: () => {
        setModalData(record);
        set_name_input(record.username);
        set_email_input(record.email);
        set_is_admin(record.is_admin);
        set_is_blocked(record.is_blocked);
        setShowModal(true);
      },
    };
  };

  const handleOk = () => {
    modalData.username = name_input;
    modalData.email = email_input;
    modalData.is_admin = is_admin;
    modalData.is_blocked = is_blocked;
    mod_user_info(modalData)
      .then(() => message.success("修改信息成功！", 0.5))
      .then(() => setShowModal(false))
      .then(window.location.reload);
  };
  const onCancel = () => {
    // set_name_input(modalData.username);
    // set_email_input(modalData.email);
    // set_is_admin(modalData.is_admin);
    // set_is_blocked(modalData.is_blocked);
    setShowModal(false);
  };

  return (
    <div>
      <Modal open={showModal} onOk={handleOk} onCancel={onCancel}>
        <List>
          <List.Item>
            <Col span={2}>
              <b>{"姓名"}</b>
            </Col>
            <Col span={1} />
            <Col span={18}>
              <Input
                value={name_input}
                onChange={(e) => {
                  set_name_input(e.target.value);
                }}
              />
            </Col>
            <Col span={3} />
          </List.Item>
          <List.Item>
            <Col span={2}>
              <b>{"邮箱"}</b>
            </Col>
            <Col span={1} />
            <Col span={18}>
              <Input
                value={email_input}
                onChange={(e) => {
                  set_email_input(e.target.value);
                }}
              />
            </Col>
            <Col span={3} />
          </List.Item>
          <List.Item>
            <Radio.Group
              onChange={(e) => {
                set_is_admin(e.target.value !== 0);
              }}
              value={Number(is_admin)}
            >
              <Radio value={0}>{"User"}</Radio>
              <Radio value={1}>{"Admin"}</Radio>
            </Radio.Group>
          </List.Item>
          <List.Item>
            <Radio.Group
              onChange={(e) => {
                set_is_blocked(e.target.value === 1);
              }}
              value={Number(is_blocked)}
            >
              <Radio value={0}>{"ok"}</Radio>
              <Radio value={1}>{"blocked"}</Radio>
            </Radio.Group>
          </List.Item>
        </List>
      </Modal>
      <div className={"man_user"}>
        <Title>{"用户管理"}</Title>
      </div>
      <div className={"search_bar"}>
        <UserSearch allUsers={allUsers} setFilter={setFilterUsers} />
      </div>
      <Table
        className={"order_table"}
        size={"small"}
        rowKey={(record) => record.id}
        onRow={handleRow}
        pagination={{ pageSize: 10 }}
        columns={man_user_columns}
        dataSource={filterUsers}
      ></Table>
    </div>
  );
};
