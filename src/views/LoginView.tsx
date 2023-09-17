import React, {useEffect} from "react";
import {Col, message, Row, Space} from "antd";

import {LoginForm} from "../components/GlobalComponents/LoginForm";
import "../css/LoginView.css";
import {LogoutService} from "../services/LoginService";
import {IMsg} from "../assets/Interface";

export const LoginView = () => {
    // useEffect(() => deleteUser);
    useEffect(() => {
        const handleLogout = async () => {
            let response = await LogoutService();
            if (response.ok) {
                let msg: IMsg = await response.json();
                if (msg.msg !== "")
                    message.info(`在线时间: ${msg.msg}`)
            }
        }
        handleLogout().catch((err) => console.error(err))
    }, []);
    return (
        <div className={"login_wrapper"}>
            <div className={"position-relative"}>
                <div className={"banner"}>
                    <div className={"logo_container"}>
                        <h2 className={"logo_text"}>{"Ebook Store"}</h2>
                    </div>
                </div>
            </div>
            <Row>
                <Col span={8}>
                    <Space/>
                </Col>
                <Col span={8}>
                    <div className={"application_main"}>
                        <main>
                            <LoginForm/>
                        </main>
                    </div>
                </Col>
                <Col span={8}>
                    <Space/>
                </Col>
            </Row>
        </div>
    );
};
