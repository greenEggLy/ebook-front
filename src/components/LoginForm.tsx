import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [remember, setRemember] = useState(false);
  const [submit, setSubmit] = useState(false);

  return (
    <Form className={"login_form"}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item
        style={{ display: "flex" }}
        name="rememberMe"
        valuePropName="checked"
      >
        <Checkbox onChange={() => setRemember(!remember)}>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className={"submit"} type="primary" htmlType="submit">
          Log in
        </Button>
        <Link to={"/signup"}>
          <Button className={"submit"}>Sign up</Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export const SignUpForm = () => {
  return (
    <Form className={"login_form"}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder={"password"} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("请输入相同密码!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder={"confirm password"} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder={"Email Address"} />
      </Form.Item>
      <Form.Item>
        <Button className={"submit"} type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};
