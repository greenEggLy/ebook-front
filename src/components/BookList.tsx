import { List } from "antd";
import { BookInfo_ } from "../Interface";
import { BookCard } from "./BookCard";
import { Link } from "react-router-dom";

interface Props {
  books: BookInfo_[];
}

export default function BookList({ books }: Props) {
  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      // itemLayout={"horizontal"}
      pagination={{ pageSize: 16 }}
      dataSource={books}
      renderItem={(item) => (
        <List.Item style={{ width: 300 }}>
          <Link to={"/book/" + item.id}>
            <BookCard book={item} />
          </Link>
        </List.Item>
      )}
    >
      {/*{books.map((item: BookInfo_) => (*/}
      {/*  <List.Item style={{ width: 300 }}>*/}
      {/*    <Link to={"/book/" + item.id}>*/}
      {/*      <BookCard book={item} />*/}
      {/*    </Link>*/}
      {/*  </List.Item>*/}
      {/*))}*/}
    </List>
  );
}
