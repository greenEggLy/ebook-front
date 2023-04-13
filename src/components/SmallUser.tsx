import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import { User } from "../Interface";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to={"/login"}>{"登出"}</Link>,
  },
];

export const SmallUser = ({ user }: Props) => {
  return (
    // <span className={"welcome"}>
    <Space className={"welcome"}>
      <Dropdown menu={{ items }}>
        <Avatar size={30} src={user.avatar} />
      </Dropdown>
      <h4>{"Hello, " + user.name + "!"}</h4>
    </Space>
    // </span>
  );
};
