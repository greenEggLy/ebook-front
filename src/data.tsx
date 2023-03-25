import { Book, Navi_, Good, User, Order } from "./Interface";
import {
  LaptopOutlined,
  UserOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const Books: Book[] = [
  {
    id: 1,
    title: "book1",
    author: "me",
    ISBN: "12345",
    price: 32.8,
    pics: ["http://img3m0.ddimg.cn/32/24/29477480-1_w_10.jpg"],
    pub: "Shanghai JiaoTong University",
    left_number: 10,
    bought_number: 20,
  },
  {
    id: 2,
    title: "book2",
    author: "you",
    ISBN: "23456",
    price: 22,
    pics: [
      "https://pic.arkread.com/cover/ebook/f/149523427.1653696667.jpg!cover_default.jpg",
      "https://pic.arkread.com/cover/ebook/f/415003657.1670983097.jpg!cover_default.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    left_number: 10,
    bought_number: 10,
  },
  {
    id: 3,
    title: "book3",
    author: "you",
    ISBN: "34567",
    price: 22,
    pics: [
      "https://m.media-amazon.com/images/I/711YQG--uzL._AC_UF1000,1000_QL80_.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    bought_number: 30,
    left_number: 5,
  },
  {
    id: 4,
    title: "book4",
    author: "you",
    ISBN: "45678",
    price: 22,
    pics: [
      "https://images-cn.ssl-images-amazon.cn/images/I/414zfqI4TuL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
      "https://pic.arkread.com/cover/ebook/f/421912608.1678180352.jpg!cover_default.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    bought_number: 3,
    left_number: 10,
  },
  {
    id: 5,
    title: "book5",
    author: "you",
    ISBN: "56789",
    price: 22,
    pics: [
      "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    bought_number: 0,
    left_number: 0,
  },
  {
    id: 6,
    title: "book6",
    author: "you",
    ISBN: "67890",
    price: 22,
    pics: [
      "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    left_number: 10,
    bought_number: 0,
  },
  {
    id: 7,
    title: "book7",
    author: "you",
    ISBN: "78901",
    price: 22,
    pics: [
      "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
    ],
    pub: "Shanghai JiaoTong University",
    left_number: 10,
    bought_number: 0,
  },
];

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
    label: "Profile",
    icon: <UserOutlined />,
    link: "/user",
  },
];

export const Goods: Good[] = [
  {
    id: 1,
    book: Books[0],
    item_number: 1,
  },
  {
    id: 2,
    book: Books[1],
    item_number: 2,
  },
  {
    id: 3,
    book: Books[2],
    item_number: 1,
  },
  {
    id: 4,
    book: Books[3],
    item_number: 3,
  },
  {
    id: 5,
    book: Books[4],
    item_number: 4,
  },
];
export const Orders: Order[] = [
  {
    id: 1,
    items: [Goods[0], Goods[1]],
    time: new Date(),
    // buyer: Users[1],
  },
  {
    id: 2,
    items: [Goods[2]],
    time: new Date(),
    // buyer: Users[1],
  },
  {
    id: 3,
    items: [Goods[3], Goods[4]],
    time: new Date(),
    // buyer: Users[1],
  },
];
export const Users: User[] = [
  {
    id: 1,
    name: "raccoon1",
    avatar:
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-premiere/16x9/lal-raton-espece-envahissante.jpg",
    about_me: "love buying books",
    cart: [],
    orders: [],
    isAdmin: true,
  },
  {
    id: 2,
    name: "raccoon2",
    avatar:
      "https://img03.sogoucdn.com/v2/thumb/retype_exclude_gif/ext/auto/crop/xy/ai/w/542/h/305?appid=200698&url=https://pic.baike.soso.com/ugc/baikepic2/5806/cut-20171206233249-1934724815_jpg_542_361_44589.jpg/0",
    about_me: "love eating books",
    cart: Goods,
    orders: [Orders[0], Orders[1], Orders[2]],
    isAdmin: false,
  },
];

export const Logo: String =
  "https://www.shutterstock.com/image-photo/portrait-funny-raccoon-closeup-isolated-260nw-563270347.jpg";
