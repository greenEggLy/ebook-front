import React, { useEffect } from "react";
import { Col, Row, Space } from "antd";

import { LoginForm, SignUpForm } from "../components/LoginForm";
import "../css/LoginView.css";
import { logout } from "../services/LoginService";
import { Link } from "react-router-dom";

export const LoginView = () => {
  // useEffect(() => deleteUser);
  useEffect(() => {
    logout().catch((err) => console.error(err));
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
          <Space />
        </Col>
        <Col span={8}>
          <div className={"application_main"}>
            <main>
              <LoginForm />
            </main>
          </div>
        </Col>
        <Col span={8}>
          <Space />
        </Col>
      </Row>
    </div>
  );
};

export const SignupView = () => {
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
          <Space />
        </Col>
        <Col span={8}>
          <div className={"application_main"}>
            <main>
              <SignUpForm />
            </main>
          </div>
        </Col>
        <Col span={8}>
          <Space />
        </Col>
      </Row>
    </div>
  );
};
