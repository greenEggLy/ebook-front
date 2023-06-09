import { Col, Row, Space } from "antd";
import React from "react";
import { SignUpForm } from "../components/GlobalComponents/SignUpForm";

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
