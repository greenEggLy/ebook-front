import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Navi_ } from "../../assets/Interface";

interface Props {
  navi: Navi_[];
}

export const SideNavi = ({ navi }: Props) => {
  // let cur_navi: Navi_[] = [];
  // if (user.is_admin) cur_navi = side_navi_admin;
  // else cur_navi = side_navi;
  return (
    <Menu mode={"inline"} style={{ height: "100%", borderRight: 0 }}>
      {navi.map((item) => (
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
