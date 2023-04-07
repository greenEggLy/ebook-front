import { Book, Navi_, OrderItem, User, Order, Picture } from "./Interface";
import {
  LaptopOutlined,
  UserOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const Picutres: Picture[] = [
  {
    id: 1,
    url: "http://img3m0.ddimg.cn/32/24/29477480-1_w_10.jpg",
  },
  {
    id: 2,
    url: "https://pic.arkread.com/cover/ebook/f/149523427.1653696667.jpg!cover_default.jpg",
  },
  {
    id: 3,
    url: "https://pic.arkread.com/cover/ebook/f/415003657.1670983097.jpg!cover_default.jpg",
  },
  {
    id: 4,
    url: "https://m.media-amazon.com/images/I/711YQG--uzL._AC_UF1000",
  },
  {
    id: 5,
    url: "https://images-cn.ssl-images-amazon.cn/images/I/414zfqI4TuL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
  },
  {
    id: 6,
    url: "https://pic.arkread.com/cover/ebook/f/421912608.1678180352.jpg!cover_default.jpg",
  },
  {
    id: 7,
    url: "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
  },
  {
    id: 8,
    url: "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
  },
  {
    id: 9,
    url: "https://pic.arkread.com/cover/ebook/f/336172192.1653693071.jpg!cover_default.jpg",
  },
];

export const Books: Book[] = [
  {
    id: 1,
    title: "book1",
    author: "me",
    isbn: "12345",
    price: 32.8,
    pics: [Picutres[0]],
    pub: "Shanghai JiaoTong University",
    stock: 10,
    sales: 20,
  },
  {
    id: 2,
    title: "book2",
    author: "you",
    isbn: "23456",
    price: 22,
    pics: [Picutres[1], Picutres[2]],
    pub: "Shanghai JiaoTong University",
    stock: 10,
    sales: 10,
  },
  {
    id: 3,
    title: "book3",
    author: "you",
    isbn: "34567",
    price: 22,
    pics: [Picutres[3]],
    pub: "Shanghai JiaoTong University",
    sales: 30,
    stock: 5,
  },
  {
    id: 4,
    title: "book4",
    author: "you",
    isbn: "45678",
    price: 22,
    pics: [Picutres[4], Picutres[5]],
    pub: "Shanghai JiaoTong University",
    sales: 3,
    stock: 10,
  },
  {
    id: 5,
    title: "book5",
    author: "you",
    isbn: "56789",
    price: 22,
    pics: [Picutres[6]],
    pub: "Shanghai JiaoTong University",
    sales: 0,
    stock: 0,
  },
  {
    id: 6,
    title: "book6",
    author: "you",
    isbn: "67890",
    price: 22,
    pics: [Picutres[7]],
    pub: "Shanghai JiaoTong University",
    stock: 10,
    sales: 0,
  },
  {
    id: 7,
    title: "book7",
    author: "you",
    isbn: "78901",
    price: 22,
    pics: [Picutres[8]],
    pub: "Shanghai JiaoTong University",
    stock: 10,
    sales: 0,
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

export const Goods: OrderItem[] = [
  {
    id: 1,
    book: Books[0],
    number: 1,
  },
  {
    id: 2,
    book: Books[1],
    number: 2,
  },
  {
    id: 3,
    book: Books[2],
    number: 1,
  },
  {
    id: 4,
    book: Books[3],
    number: 3,
  },
  {
    id: 5,
    book: Books[4],
    number: 4,
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
    name: "raccoon2",
    avatar:
      "https://img03.sogoucdn.com/v2/thumb/retype_exclude_gif/ext/auto/crop/xy/ai/w/542/h/305?appid=200698&url=https://pic.baike.soso.com/ugc/baikepic2/5806/cut-20171206233249-1934724815_jpg_542_361_44589.jpg/0",
    about: "love eating books",
    cart: Goods,
    orders: [Orders[0], Orders[1], Orders[2]],
    password: "123456",
    isAdmin: false,
    isBlocked: false,
  },
  {
    id: 2,
    name: "raccoon1",
    avatar:
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-premiere/16x9/lal-raton-espece-envahissante.jpg",
    about: "love buying books",
    cart: [],
    orders: [],
    password: "123456",
    isAdmin: true,
    isBlocked: false,
  },
];

export const Logo: String =
  "https://www.shutterstock.com/image-photo/portrait-funny-raccoon-closeup-isolated-260nw-563270347.jpg";
