import React, {useEffect, useState} from "react";
import {Layout, message, theme} from "antd";
import {SideNavi} from "../components/GlobalComponents/Navigators";
import {Outlet, useNavigate} from "react-router-dom";
import "../css/HomeView.css";
import {ToolFilled} from "@ant-design/icons";
import {HomeHeader} from "../components/GlobalComponents/HomeHeader";
import {IUser, Navi_} from "../assets/Interface";
import {GetUser} from "../services/UserService";
import {Footer} from "antd/es/layout/layout";
import {EmptyUser} from "../assets/data/emptyData";
import {CheckSession} from "../services/LoginService";
import {side_navi, side_navi_admin} from "../assets/data/data";
import {sessionCheck} from "../utils/sessionUtil";

const {Header, Content, Sider} = Layout;

export const HomeView = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const navigation = useNavigate();

    const [user, setUser] = useState<IUser>(EmptyUser);
    const [navi, setNavi] = useState<Navi_[]>([]);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        CheckSession().then((res) => {
            let status = sessionCheck(res);
            if (!status.ok)
                message.error(status.msg, 1).then(() => navigation(status.path));
            if (res.data.is_admin) setNavi(side_navi_admin);
            else setNavi(side_navi);
            GetUser(res.data.id).then((res) => setUser(res));
        });
    }, [navigation]);

    if (user === undefined || user.id === 0) return <div></div>;
    else
        return (
            <Layout>
                <Header className="header">
                    <HomeHeader user={user} collapsed={collapsed}/>
                </Header>
                <Layout style={{marginLeft: collapsed ? 50 : 175}} hasSider>
                    <Sider
                        width={200}
                        style={{
                            background: colorBgContainer,
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            right: 30,
                        }}
                        collapsible={true}
                        collapsed={collapsed}
                        onCollapse={() => setCollapsed(!collapsed)}
                        trigger={<ToolFilled/>}
                    >
                        <SideNavi navi={navi}/>
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
                                <Outlet/>
                            </div>
                        </Content>
                        <Footer>
                            <p>Ebook Store @Shanghai Jiao Tong University</p>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
};
