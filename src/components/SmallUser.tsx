import type { MenuProps } from "antd";
import { Avatar, Col, Dropdown, Row, Space } from "antd";
import React from "react";
import { User } from "../Interface";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}

const items: MenuProps["items"] = [
  // {
  //   key: "1",
  //   label: <Link to={"/user"}>{"查看个人资料"}</Link>,
  // },
  // {
  //   key: "2",
  //   label: <Link to={"/cart"}>{"查看购物车"}</Link>,
  // },
  {
    key: "3",
    label: <Link to={"/login"}>{"登出"}</Link>,
  },
];

export const SmallUser = ({ user }: Props) => {
  return (
    <Row>
      <Col span={20}></Col>
      <Space className={"welcome"}>
        <Dropdown menu={{ items }}>
          <Avatar size={30} src={user.avatar} />
        </Dropdown>
        <h4>{"Hello, " + user.name + "!"}</h4>
      </Space>
    </Row>
  );
};
