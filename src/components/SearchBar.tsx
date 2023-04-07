import { Book, OrderItem, Order, CartItem } from "../Interface";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useState } from "react";
import { Books } from "../data";

const { Search } = Input;

interface PropsBuy {
  allData: Book[] | undefined;
  setFilter: any;
}

interface FilterBuy {
  item: Book;
  text: string;
}

export const BookSearch = ({ allData, setFilter }: PropsBuy) => {
  function ContentFilter({ item, text }: FilterBuy) {
    let title = item.title;
    let ISBN = item.isbn;
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
    let allNewData: Book[] = [];
    if (text) {
      let newData: Book[] = [];
      let textGroup = text.trim().split(/\s+/);
      for (let text of textGroup) {
        newData = [];
        if (allData)
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
  item: OrderItem;
  text: string;
}

export const CartSearch = ({ allData, setFilter }: PropsCart) => {
  function ContentFilter({ item, text }: FilterCart) {
    let title = item.book.title;
    let ISBN = item.book.isbn;
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
    let allNewData: OrderItem[] = [];
    if (text) {
      let newData: OrderItem[] = [];
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

interface PropsOrder {
  allOrders: Order[];
  setFilter: any;
}

export const OrderSearch = ({ allOrders, setFilter }: PropsOrder) => {
  const FilterWrapper = (item: Order, text: string) => {
    for (const good of item.items) {
      if (ContentFilter(good, text)) {
        return true;
      }
    }
    return false;
  };

  const ContentFilter = (item: OrderItem, text: string) => {
    let title = item.book.title;
    let ISBN = item.book.isbn;
    let authors = item.book.author;
    let inAuthors = false;
    for (let author of authors) {
      if (author.indexOf(text) > -1) {
        inAuthors = true;
        break;
      }
    }
    return inAuthors || title.indexOf(text) > -1 || ISBN.indexOf(text) > -1;
  };

  function onSearch(text: string) {
    let allNewData: Order[] = [];
    if (text) {
      let newData: Order[] = [];
      let textGroup = text.trim().split(/\s+/);
      for (let text of textGroup) {
        newData = [];
        newData = allOrders.filter((item) => FilterWrapper(item, text));
        if (newData) {
          for (const data of newData) {
            if (!allNewData.includes(data)) allNewData.push(data);
          }
        }
      }
      setFilter(allNewData);
    } else setFilter(allOrders);
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
