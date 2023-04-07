import { Book, User } from "../../Interface";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AddItem } from "../../components/AddItem";
import "../../css/BookView.css";
import { BookViewHeader } from "../../components/BookViewHeader";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../../services/BookService";
import Cookies from "universal-cookie";
import { getUser } from "../../services/UserService";

export const BookView = () => {
  let user_id = 0;
  const [user, setUser] = useState<User>();
  const [item_num, set_item_num] = useState(0);
  const [book, setBook] = useState<Book>();
  const params = useParams();
  useEffect(() => {
    let index = Number(params.id);
    getBook(index, (data: SetStateAction<Book | undefined>) =>
      setBook(data)
    ).catch(console.error);
  }, [params.id]);
  useEffect(() => {
    getUser((data: SetStateAction<User | undefined>) => setUser(data)).then(
      () => {
        if (user) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          user_id = user.id;
        }
      }
    );
  }, []);
  if (book) {
    return (
      <div className={"book_view"}>
        <BookViewHeader book={book} />
        <div className={"scan"}>
          <PicDisplay book={book} />
          <div className={"info_display"}>
            <div className={"name_info"}>
              <h1 className={"title"}>{book.title}</h1>
              <p className={"detail"}>{"ISBN: " + book.isbn}</p>
              <p className={"stock"}>{"库存: " + book.stock}</p>
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
                user_id={user_id}
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
  const [showPic, setShowPic] = useState(book.pics[0].url);
  return (
    <div className={"pic_display"}>
      <img className={"big_pic"} alt={book.title} src={showPic} />
      <div className={"pic_slider_box"}>
        <ul className={"pic_slider"}>
          {book.pics.map((item) => (
            <li className={"slider_item"}>
              <img
                className={"slider_img"}
                alt={item.url}
                src={item.url}
                onClick={() => setShowPic(item.url)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
