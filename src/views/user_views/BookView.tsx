import { Book, backMsg, User } from "../../Interface";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { AddItem } from "../../components/AddItem";
import "../../css/BookView.css";
import { BookViewHeader } from "../../components/BookViewHeader";
import { useNavigate, useParams } from "react-router-dom";
import { get_one_book } from "../../services/BookService";
import { get_user, getUser } from "../../services/UserService";
import { Col, message, Row } from "antd";
import { emptyBook, emptySessionMsg, emptyUser } from "../../emptyData";
import { check_session } from "../../services/LoginService";

export const BookView = () => {
  const params = useParams();
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const [user, setUser] = useState<User>(emptyUser);

  const [book, setBook] = useState<Book>(emptyBook);
  const [item_num, set_item_num] = useState(0);

  useEffect(() => {
    let index = Number(params.id);
    get_one_book(index, (data: Book) => setBook(data)).catch((err) =>
      console.error(err)
    );
  }, [params.id]);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        get_user(msg_ref.current.data.userId, (data: User) =>
          setUser(data)
        ).catch((err) => console.error(err));
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  // useEffect(() => {
  //   getUser((data: User) => {
  //     user_ref.current = data;
  //     setUser(data);
  //   })
  //     .then(() => {
  //       if (!user_ref.current) navigation("/login");
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  if (book && user.id) {
    return (
      <div className={"book_view"}>
        <BookViewHeader book={book} />
        <div className={"scan"}>
          <PicDisplay book={book} />
          <div className={"info_display"}>
            <div className={"name_info"}>
              <h1 className={"title"}>{book.title}</h1>
              <p className={"detail"}>{"ISBN: " + book.isbn}</p>
              <Row>
                <p className={"stock"}>{"库存: " + book.stock}</p>
                <Col span={1}></Col>
                <p className={"sales"}>{"销量: " + book.sales}</p>
              </Row>
            </div>
            <div className={"publication"}>
              <span className={"t1"} id={"author"}>
                {"作者: " + book.author + " "}
              </span>
              <span className={"t1"}>{"出版社: " + book.pub}</span>
            </div>
            <p className={"price"}>
              <span className={"yuan"}>{"￥"}</span>
              {book.price}
            </p>
            <div className={"purchase"}>
              <AddItem
                user_id={user.id}
                book_id={book.id}
                stock={book.stock}
                item_num={item_num}
                set_item_num={set_item_num}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else return <></>;
};

interface pic_props {
  book: Book;
}

const PicDisplay = ({ book }: pic_props) => {
  return (
    <div className={"pic_display"}>
      <img className={"big_pic"} alt={book.title} src={book.picture} />
    </div>
  );
};
