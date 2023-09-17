import React, {useState} from "react";
import {Button, Checkbox, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {LoginService} from "../../services/LoginService";
import {IMsg} from "../../assets/Interface";

export const LoginForm = () => {
    const [remember, setRemember] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const checkUser = async () => {
        const usr_name = form.getFieldValue(["username"]);
        const usr_password = form.getFieldValue(["password"]);
        const callback = (data: IMsg) => {
            if (data && data.status >= 0)
                localStorage.setItem("user", data.data.username);
        };
        await LoginService(usr_name, usr_password, (data: IMsg) => {
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
                <Input placeholder="username"/>
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
                <Input.Password placeholder="password"/>
            </Form.Item>
            <Form.Item
                style={{display: "flex"}}
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
