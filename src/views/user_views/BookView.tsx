import { AuthInfo, Book } from "../../assets/Interface";
import { useEffect, useState } from "react";
import { AddItem } from "../../components/userComponents/AddItem";
import "../../css/BookView.css";
import { useNavigate, useParams } from "react-router-dom";
import { GetBook } from "../../services/BookService";
import { Button, Col, message, Row } from "antd";
import { EmptyAuth, emptyBook } from "../../assets/data/emptyData";
import { check_session } from "../../services/LoginService";
import { getImgPath } from "../../utils/imgPathUtil";
import { sessionCheck } from "../../utils/sessionUtil";

export const BookView = () => {
  const params = useParams();
  const navigation = useNavigate();
  const [user, setUser] = useState<AuthInfo>(EmptyAuth);

  const [book, setBook] = useState<Book>(emptyBook);
  const [item_num, set_item_num] = useState(0);

  useEffect(() => {
    let index = Number(params.id);
    GetBook(index).then((data: Book) => {
      setBook(data);
    });
  }, [params.id]);

  useEffect(() => {
    check_session().then((res) => {
      let status = sessionCheck(res);
      if (!status.ok)
        message.error(status.msg).then(() => navigation(status.path));
      setUser(res.data);
    });
  }, [navigation]);

  if (book && user.id) {
    return (
      <div className={"book_view"}>
        <div className={"head"}>
          <Button className={"go_back"} onClick={() => window.history.go(-1)}>
            {"< back"}
          </Button>
        </div>
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
      <img
        className={"big_pic"}
        alt={book.title}
        src={getImgPath(book.cover)}
      />
    </div>
  );
};
