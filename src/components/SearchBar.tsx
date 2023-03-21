import { BookInfo_, CartItem } from "../Interface";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState } from "react";
import { Books } from "../data";

const { Search } = Input;

interface PropsBuy {
  allData: BookInfo_[];
  setFilter: any;
}

interface FilterBuy {
  item: BookInfo_;
  text: string;
}

export const BookSearch = ({ allData, setFilter }: PropsBuy) => {
  function ContentFilter({ item, text }: FilterBuy) {
    let title = item.title;
    let ISBN = item.ISBN;
    let authors = item.author;
    let inAuthors = false;
    for (let author of authors) {
      if (author.indexOf(text) > -1) {
        inAuthors = true;
        break;
      }
    }
    return inAuthors || title.indexOf(text) > -1 || ISBN.indexOf(text) > -1;
  }

  function onSearch(text: string) {
    let allNewData: BookInfo_[] = [];
    if (text) {
      let newData: BookInfo_[] = [];
      let textGroup = text.trim().split(/\s+/);
      for (let text of textGroup) {
        newData = [];
        newData = allData.filter((item) => ContentFilter({ item, text }));
        if (newData) {
          for (const data of newData) {
            if (!allNewData.includes(data)) allNewData.push(data);
          }
        }
      }
      setFilter(allNewData);
    } else setFilter(allData);
  }

  return (
    <Space className={"space"}>
      <Search
        className={"search_content"}
        placeholder="input search text"
        enterButton="Search"
        allowClear={true}
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );
};

interface PropsCart {
  allData: CartItem[];
  setFilter: any;
}

interface FilterCart {
  item: CartItem;
  text: string;
}

export const CartSearch = ({ allData, setFilter }: PropsCart) => {
  function ContentFilter({ item, text }: FilterCart) {
    let title = item.book.title;
    let ISBN = item.book.ISBN;
    let authors = item.book.author;
    let inAuthors = false;
    for (let author of authors) {
      if (author.indexOf(text) > -1) {
        inAuthors = true;
        break;
      }
    }
    return inAuthors || title.indexOf(text) > -1 || ISBN.indexOf(text) > -1;
  }

  function onSearch(text: string) {
    let allNewData: CartItem[] = [];
    if (text) {
      let newData: CartItem[] = [];
      let textGroup = text.trim().split(/\s+/);
      for (let text of textGroup) {
        newData = [];
        newData = allData.filter((item) => ContentFilter({ item, text }));
        if (newData) {
          for (const data of newData) {
            if (!allNewData.includes(data)) allNewData.push(data);
          }
        }
      }
      setFilter(allNewData);
    } else setFilter(allData);
  }

  return (
    <Space className={"space"}>
      <Search
        className={"search_content"}
        placeholder="input search text"
        enterButton="Search"
        allowClear={true}
        size="large"
        onSearch={onSearch}
      />
    </Space>
  );
};
