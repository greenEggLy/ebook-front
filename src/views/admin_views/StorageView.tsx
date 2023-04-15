import { BookSearch } from "../../components/SearchBar";
import { Book, backMsg, User } from "../../Interface";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import "../../css/StorageView.css";
import type { FormInstance } from "antd/es/form";
import {
  addBook,
  delBook,
  get_all_books,
  modBook,
  modBookPic,
} from "../../services/BookService";
import { useNavigate } from "react-router-dom";
import { check_session } from "../../services/LoginService";
import { emptySessionMsg } from "../../emptyData";

const { Title } = Typography;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const newData: Book = {
  id: 0,
  title: ``,
  author: "",
  isbn: ``,
  price: 0,
  picture: "",
  pub: "",
  stock: 0,
  sales: 0,
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.error(errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const StorageView = () => {
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);

  const [dataSource, setDataSource] = useState<Book[]>([]);
  const [filterData, setFilterData] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [disButton, setDisButton] = useState(true);
  const [selectId, setSelectId] = useState<number>(-1);
  const [formUrl, setFormUrl] = useState<string>("");

  const [newBook, setNewBook] = useState<Book>(newData);
  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        if (msg_ref.current.data.userType < 1)
          message.error("没有管理员权限！").then(() => navigation("/"));
        else {
          get_all_books((data: Book[]) => {
            setDataSource(data);
            setFilterData(data);
          }).catch((err) => console.error(err));
        }
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  const handleDelete = (key: React.Key) => {
    if (dataSource.length) {
      const newData = dataSource.filter((item) => item.id !== key);
      if (key > 0) delBook(key).catch((err) => console.error(err));
      if (key === 0) setDisButton(true);
      setDataSource(newData);
    }
  };

  const canAdd = () => {
    if (
      !(
        newBook.title &&
        newBook.author &&
        newBook.isbn &&
        newBook.price &&
        newBook.pub &&
        newBook.picture
      )
    )
      return -1;
    if (newBook.price <= 0) return -2;
    return 0;
  };

  const equals = (book1: Book, book2: Book) => {
    if (book1.picture !== book2.picture) return false;
    if (book1.pub !== book2.pub) return false;
    if (book1.isbn !== book2.isbn) return false;
    if (book1.price !== book2.price) return false;
    if (book1.author !== book2.author) return false;
    if (book1.stock !== book2.stock) return false;
    return book1.title === book2.title;
  };

  const handleAdd = () => {
    if (dataSource.length) {
      setDataSource([newData, ...dataSource]);
      setNewBook(newData);
      setDisButton(false);
    }
  };
  const handleConfirmAdd = () => {
    if (dataSource.length) {
      setDisButton(true);
      let status = canAdd();
      if (status === 0) {
        addBook(newBook).finally(window.location.reload);
        setNewBook(newData);
      } else if (status === -1) {
        message.error("请填写完整信息！", 1);
        setDisButton(false);
      } else {
        message.error("填写信息有误！", 1);
        setDisButton(false);
      }
    }
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "封面",
      dataIndex: "picture",
      width: "15%",
      render: (value, _, index) => (
        <img
          onClick={() => {
            setFormUrl(value);
            setSelectId(index);
            setShowModal(true);
          }}
          className={"storage_pic"}
          alt={""}
          src={value}
        />
      ),
    },
    {
      title: "书名",
      dataIndex: "title",
      width: "15%",
      editable: true,
    },
    {
      title: "作者",
      dataIndex: "author",
      editable: true,
    },
    {
      title: "出版社",
      dataIndex: "pub",
      editable: true,
    },
    {
      title: "价格",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      editable: true,
    },
    {
      title: "库存",
      dataIndex: "stock",
      editable: true,
    },
    {
      title: "删除",
      dataIndex: "operation",
      // @ts-ignore
      render: (_, record: { id: React.Key }) =>
        dataSource ? (
          dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="确定删除?"
                onConfirm={() => handleDelete(record.id)}
              >
                <a>Delete</a>
              </Popconfirm>
            </>
          ) : null
        ) : null,
    },
  ];

  const handleSave = (row: Book) => {
    if (dataSource) {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      if (item.id === 0) setNewBook(row);
      else if (!equals(row, item))
        modBook(row).then(() => message.success("修改成功！"));
      setDataSource(newData);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Book) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const HandleOk = () => {
    let pic_url = formUrl;
    if (selectId > 0)
      modBookPic(selectId, pic_url).catch((err) => console.error(err));
    else newBook.picture = pic_url;
    setFormUrl("");
    setSelectId(-1);
    setShowModal(false);
  };

  if (dataSource)
    return (
      <div>
        <div className={"order_title"}>
          <Title>{"库存"}</Title>
        </div>
        <div className={"search_bar"}>
          <BookSearch allData={dataSource} setFilter={setFilterData} />
        </div>
        <Button
          onClick={handleAdd}
          type="primary"
          disabled={!disButton}
          style={{ marginBottom: 16 }}
        >
          {"添加书籍"}
        </Button>
        <Button
          onClick={handleConfirmAdd}
          disabled={disButton}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          {"确认修改"}
        </Button>
        <Modal
          title={"书籍图片"}
          open={showModal}
          onOk={HandleOk}
          onCancel={() => setShowModal(false)}
        >
          <Input value={formUrl} onChange={(e) => setFormUrl(e.target.value)} />
        </Modal>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={filterData}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  else return <></>;
};
