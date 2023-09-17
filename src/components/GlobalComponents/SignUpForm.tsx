import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/EmalRegexUtil";
import {IMsg} from "../../assets/Interface";
import {SignupService} from "../../services/LoginService";
import React from "react";

export const SignUpForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const check_sign_up = async () => {
        const username = form.getFieldValue(["username"]);
        const password = form.getFieldValue(["password"]);
        const email = form.getFieldValue(["email"]);
        if (!validateEmail(email)) {
            message.error("请输入合法邮箱");
            return;
        }
        const response = await SignupService(username, email, password);
        if (!response.ok) {
            message.error("注册失败", 1);
            return;
        }
        const msg: IMsg = await response.json();
        if (msg.status !== 0) {
            message.error(msg.msg, 1);
            return;
        }
        message.success("注册成功", 1).then(() => navigate("/login"));
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
                <Input placeholder="username"/>
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
                <Input.Password placeholder={"password"}/>
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
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("请输入相同密码!"));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={"confirm password"}/>
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
                <Input placeholder={"Email Address"}/>
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
