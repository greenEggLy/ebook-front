import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "../data";
import Cookies from "universal-cookie";
import { setExpireDate } from "../utils/cookieOps";
import { Login } from "../services/LoginService";
import { sessionMsg } from "../Interface";

export const LoginForm = () => {
  const [remember, setRemember] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const checkUser = async () => {
    const usr_name = form.getFieldValue(["username"]);
    const usr_password = form.getFieldValue(["password"]);
    const callback = (data: React.SetStateAction<sessionMsg | undefined>) => {
      if (data) {
        if ("status" in data && data.status >= 0) {
          localStorage.setItem("user", data.data.username);
          navigate("/");
          message.success(data.msg);
        } else {
          if ("msg" in data) {
            message.error(data.msg);
          }
        }
      }
    };
    await Login(
      usr_name,
      usr_password,
      (data: React.SetStateAction<sessionMsg | undefined>) => callback(data)
    );
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
