import { List } from "antd";
import { Book } from "../../assets/Interface";
import { BookCard } from "./BookCard";
import { Link } from "react-router-dom";

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      pagination={{ pageSize: 16 }}
      dataSource={books}
      renderItem={(item) => (
        <List.Item style={{ width: 300 }}>
          <Link to={"/book/" + item.id}>
            <BookCard book={item} />
          </Link>
        </List.Item>
      )}
    ></List>
  );
}
