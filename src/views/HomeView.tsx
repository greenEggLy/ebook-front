import React from "react";
import { Col, Layout, Row, theme } from "antd";
import { SideNavi } from "../components/Navigators";
import { Outlet } from "react-router-dom";
import { User } from "../Interface";
import "../css/HomeView.css";
import { SmallUser } from "../components/SmallUser";
import { HomeHeader } from "../components/HomeHeader";
import { Logo } from "../data";
import * as url from "url";

const { Header, Content, Sider } = Layout;

interface Props {
  user: User;
}

export const HomeView = ({ user }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <HomeHeader user={user} />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          collapsible={true}
          trigger={null}
        >
          <SideNavi user={user} />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div className={"detail"}>
              <Outlet />
            </div>
            <p>Ebook Store @Shanghai Jiao Tong University</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
