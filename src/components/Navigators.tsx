import { Menu } from "antd";
import { side_navi, side_navi_admin } from "../data";
import { Link } from "react-router-dom";
import { Navi_, User } from "../Interface";

interface Props {
  user: User;
}

export const SideNavi = ({ user }: Props) => {
  let cur_navi: Navi_[] = [];
  if (user.isAdmin) cur_navi = side_navi_admin;
  else cur_navi = side_navi;
  return (
    <Menu mode={"inline"} style={{ height: "100%", borderRight: 0 }}>
      {cur_navi.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
