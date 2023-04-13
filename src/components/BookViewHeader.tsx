import "../css/BookView.css";
import {Book} from "../Interface";
import {Button} from "antd";

// import { Categories } from "../data";

interface Props {
  book: Book;
}

export const BookViewHeader = ({ book }: Props) => {
  // let bread: string[] = [];
  //
  // function getBreadcrumb(categoryId: number) {
  //   if (categoryId === -1) {
  //     bread = [];
  //     return;
  //   }
  //   let self = Categories.filter((item) => item.id === categoryId)[0];
  //   let parentId: number = self.parentID;
  //   let newBread = bread;
  //   newBread.push(self.content);
  //   getBreadcrumb(parentId);
  //   bread.push(self.content);
  // }
  //
  // getBreadcrumb(book.category.id);

  return (
    <div className={"head"}>
      <Button className={"go_back"} onClick={() => window.history.go(-1)}>
        {"< back"}
      </Button>
      {/*<Breadcrumb separator={">"}>*/}
      {/*  {bread.map((item) => (*/}
      {/*    <Breadcrumb.Item>{item}</Breadcrumb.Item>*/}
      {/*  ))}*/}
      {/*</Breadcrumb>*/}
    </div>
  );
};
