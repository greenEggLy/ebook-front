import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginService, SignupService } from "../../services/LoginService";
import { Msg } from "../../assets/Interface";

export const LoginForm = () => {
  const [remember, setRemember] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const checkUser = async () => {
    const usr_name = form.getFieldValue(["username"]);
    const usr_password = form.getFieldValue(["password"]);
    const callback = (data: Msg) => {
      if (data && data.status >= 0)
        localStorage.setItem("user", data.data.username);
    };
    await LoginService(usr_name, usr_password, (data: Msg) => {
      callback(data);
      if (data.status < 0) {
        message.error(data.msg, 1);
      } else {
        message.success(data.msg, 0.5).then(() => navigate("/"));
      }
    });
  };

  return (
    <Form form={form} onSubmitCapture={checkUser} className={"login_form"}>
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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const check_sign_up = () => {
    const username = form.getFieldValue(["username"]);
    const password = form.getFieldValue(["password"]);
    const email = form.getFieldValue(["email"]);
    let msg: Msg;
    if (!username || !password || !email) return;
    SignupService(username, email, password, (data: Msg) => (msg = data)).then(
      () => {
        if (msg.status >= 0) {
          message.success(msg.msg, 0.5).then(() => navigate("/login"));
        } else {
          message.error(msg.msg, 1);
        }
      }
    );
  };

  return (
    <Form className={"login_form"} form={form} onSubmitCapture={check_sign_up}>
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

      <Link to={"/login"}>
        <p>{"已有账户？登录"}</p>
      </Link>

      <Form.Item>
        <Button className={"submit"} type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};
