import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { SideNavi } from "../../components/Navigators";
import { Outlet, useNavigate } from "react-router-dom";
import "../../css/HomeView.css";
import { ToolFilled } from "@ant-design/icons";
import { HomeHeader } from "../../components/HomeHeader";
import { User } from "../../Interface";
import { getUser } from "../../services/UserService";

const { Header, Content, Sider } = Layout;

export const HomeView = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser((data: React.SetStateAction<User | undefined>) =>
      setUser(data)
    ).catch(console.log);
    // if (!user) navigation("/login");
  }, [navigation]);

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
