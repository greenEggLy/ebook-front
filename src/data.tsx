import { Navi_ } from "./Interface";
import {
  BarChartOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const side_navi_admin: Navi_[] = [
  {
    key: 1,
    label: "Storage",
    icon: <DatabaseOutlined />,
    link: "/admin/storage",
  },
  {
    key: 2,
    label: "Orders",
    icon: <ShoppingCartOutlined />,
    link: "/admin/orders",
  },
  {
    key: 3,
    label: "Statistics",
    icon: <BarChartOutlined />,
    link: "/admin/statistics",
  },
  {
    key: 4,
    label: "Management",
    icon: <UserOutlined />,
    link: "/admin/manuser",
  },
];

export const side_navi: Navi_[] = [
  {
    key: 1,
    label: "Main Page",
    icon: <LaptopOutlined />,
    link: "/booklist",
  },
  {
    key: 2,
    label: "Cart",
    icon: <ShoppingCartOutlined />,
    link: "/cart",
  },
  {
    key: 3,
    label: "Order",
    icon: <DatabaseOutlined />,
    link: "/order",
  },
  {
    key: 4,
    label: "Data",
    icon: <BarChartOutlined />,
    link: "/data",
  },
  {
    key: 5,
    label: "Profile",
    icon: <UserOutlined />,
    link: "/user",
  },
];
