import {Badge, Col, Input, List, message, Modal, Radio, Table, Typography,} from "antd";
import React, {useEffect, useState} from "react";
import {UserSearch} from "../../components/GlobalComponents/SearchBar";
import {IManUserInfo} from "../../assets/Interface";
import {GetAllUsers, ModUserInfo_ADMIN} from "../../services/UserService";
import {ColumnsType} from "antd/es/table";
import {CheckSession} from "../../services/LoginService";
import {useNavigate} from "react-router-dom";
import {adminSessionCheck} from "../../utils/sessionUtil";

const {Title} = Typography;

const emptyData: IManUserInfo = {
    id: -1,
    username: "",
    email: "",
    is_admin: false,
    is_blocked: true,
};

export const ManUserView = () => {
    const navigation = useNavigate();

    const [allUsers, setAllUsers] = useState<IManUserInfo[]>([]);
    const [filterUsers, setFilterUsers] = useState<IManUserInfo[]>([]);
    const [modalData, setModalData] = useState<IManUserInfo>(emptyData);
    const [name_input, set_name_input] = useState<string>("");
    const [email_input, set_email_input] = useState<string>("");
    const [is_admin, set_is_admin] = useState<boolean>(false);
    const [is_blocked, set_is_blocked] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        CheckSession().then((res) => {
            let status = adminSessionCheck(res);
            if (!status.ok)
                message.error(status.msg, 1).then(() => navigation(status.path));
            GetAllUsers().then((res) => {
                setAllUsers(res);
                setFilterUsers(res);
            });
        });
    }, [navigation]);

    const man_user_columns: ColumnsType<IManUserInfo> = [
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
            width: "20%",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
            width: "15%",
        },
        {
            title: "权限",
            dataIndex: "is_admin",
            key: "admin",
            width: "15%",
            render: (_, record) => {
                if (record.is_admin) return <Badge status={"success"} text={"admin"}/>;
                else return <Badge status={"default"} text={"user"}/>;
            },
        },
        {
            title: "状态",
            dataIndex: "is_blocked",
            key: "block",
            width: "15%",
            render: (_, record) => {
                if (!record.is_blocked) return <Badge status={"success"} text={"ok"}/>;
                else return <Badge status={"error"} text={"blocked"}/>;
            },
        },
    ];

    const handleRow = (record: IManUserInfo) => {
        return {
            onClick: () => {
                setModalData(record);
                set_name_input(record.username);
                set_email_input(record.email);
                set_is_admin(record.is_admin);
                set_is_blocked(record.is_blocked);
                setShowModal(true);
            },
        };
    };

    const handleOk = () => {
        modalData.username = name_input;
        modalData.email = email_input;
        modalData.is_admin = is_admin;
        modalData.is_blocked = is_blocked;
        ModUserInfo_ADMIN(modalData)
            .then(() => message.success("修改信息成功！", 0.5))
            .then(() => setShowModal(false))
            .then(window.location.reload);
    };
    const onCancel = () => {
        // set_name_input(modalData.username);
        // set_email_input(modalData.email);
        // set_is_admin(modalData.is_admin);
        // set_is_blocked(modalData.is_blocked);
        setShowModal(false);
    };

    return (
        <div>
            <Modal open={showModal} onOk={handleOk} onCancel={onCancel}>
                <List>
                    <List.Item>
                        <Col span={2}>
                            <b>{"姓名"}</b>
                        </Col>
                        <Col span={1}/>
                        <Col span={18}>
                            <Input
                                value={name_input}
                                onChange={(e) => {
                                    set_name_input(e.target.value);
                                }}
                            />
                        </Col>
                        <Col span={3}/>
                    </List.Item>
                    <List.Item>
                        <Col span={2}>
                            <b>{"邮箱"}</b>
                        </Col>
                        <Col span={1}/>
                        <Col span={18}>
                            <Input
                                value={email_input}
                                onChange={(e) => {
                                    set_email_input(e.target.value);
                                }}
                            />
                        </Col>
                        <Col span={3}/>
                    </List.Item>
                    <List.Item>
                        <Radio.Group
                            onChange={(e) => {
                                set_is_admin(e.target.value !== 0);
                            }}
                            value={Number(is_admin)}
                        >
                            <Radio value={0}>{"User"}</Radio>
                            <Radio value={1}>{"Admin"}</Radio>
                        </Radio.Group>
                    </List.Item>
                    <List.Item>
                        <Radio.Group
                            onChange={(e) => {
                                set_is_blocked(e.target.value === 1);
                            }}
                            value={Number(is_blocked)}
                        >
                            <Radio value={0}>{"ok"}</Radio>
                            <Radio value={1}>{"blocked"}</Radio>
                        </Radio.Group>
                    </List.Item>
                </List>
            </Modal>
            <div className={"man_user"}>
                <Title>{"用户管理"}</Title>
            </div>
            <div className={"search_bar"}>
                <UserSearch allUsers={allUsers} setFilter={setFilterUsers}/>
            </div>
            <Table
                className={"order_table"}
                size={"small"}
                rowKey={(record) => record.id}
                onRow={handleRow}
                pagination={{pageSize: 10}}
                columns={man_user_columns}
                dataSource={filterUsers}
            ></Table>
        </div>
    );
};
