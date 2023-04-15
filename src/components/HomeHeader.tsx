import "../css/HomeView.css";
import { Col, Row, Space } from "antd";
import logo from "../assets/logo.svg";
import logoFont from "../assets/logo-name.svg";
import { SmallUser } from "./SmallUser";
import { User } from "../Interface";
import { Link } from "react-router-dom";

interface Props {
  user: User;
  collapsed: boolean;
}

export const HomeHeader = ({ user, collapsed }: Props) => {
  return (
    <div id="header">
      <div id="header-content">
        <Row>
          <Col span={collapsed ? 1 : 3} />
          <Col span={collapsed ? 18 : 16}>
            <Space className={"header_title"}>
              <Link to={"/"}>
                <img
                  alt="logo"
                  className="logo"
                  src={logo}
                  style={{ height: 40 }}
                />
                <img
                  alt="Book Store"
                  className="logo-font"
                  src={logoFont}
                  style={{ width: 60 }}
                />
              </Link>
            </Space>
          </Col>
          <Col>
            <SmallUser user={user} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
