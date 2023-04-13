import React, { useEffect, useRef, useState } from "react";
import { Layout, message, theme } from "antd";
import { SideNavi } from "../components/Navigators";
import { Outlet, useNavigate } from "react-router-dom";
import "../css/HomeView.css";
import { ToolFilled } from "@ant-design/icons";
import { HomeHeader } from "../components/HomeHeader";
import { Navi_, backMsg, User } from "../Interface";
import { get_user, getUser } from "../services/UserService";
import { Footer } from "antd/es/layout/layout";
import { emptySessionMsg, emptyUser } from "../emptyData";
import { check_session } from "../services/LoginService";
import { side_navi, side_navi_admin } from "../data";

const { Header, Content, Sider } = Layout;

export const HomeView = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);

  const [user, setUser] = useState<User>(emptyUser);
  const [navi, setNavi] = useState<Navi_[]>([]);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        get_user(msg_ref.current.data.userId, (data: User) => {
          setUser(data);
          if (data.is_admin) setNavi(side_navi_admin);
          else setNavi(side_navi);
        }).catch((err) => console.error(err));
      } else {
        message.error(msg_ref.current.msg, 1).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => console.table(user), [user]);

  if (user.id !== 0)
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
            <SideNavi navi={navi} />
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
            </Content>
            <Footer>
              <p>Ebook Store @Shanghai Jiao Tong University</p>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  else return <></>;
};
