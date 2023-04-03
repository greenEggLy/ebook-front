import React, { useEffect } from "react";
import { Col, Layout, Row, theme } from "antd";
import { SideNavi } from "../components/Navigators";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { User } from "../Interface";
import "../css/HomeView.css";
import { ToolFilled } from "@ant-design/icons";
import { HomeHeader } from "../components/HomeHeader";
import { getUser } from "../services/GetUser";
import { LoginView } from "./LoginView";

const { Header, Content, Sider } = Layout;

export const HomeView = () => {
  const navigation = useNavigate();
  let user: User | undefined = getUser();
  useEffect(() => {
    user = getUser();
    if (!user) {
      navigation("/login");
    }
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if (!user) return <></>;
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
          trigger={<ToolFilled />}
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
