import { BookSearch } from "../../components/GlobalComponents/SearchBar";
import { Book, Msg } from "../../assets/Interface";
import { UploadOutlined } from "@ant-design/icons";
import type { InputRef, UploadFile, UploadProps } from "antd";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Typography,
  Upload,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/StorageView.css";
import type { FormInstance } from "antd/es/form";
import {
  addBook,
  delBook,
  GetAllBook,
  modBook,
  modBookCover,
} from "../../services/BookService";
import { useNavigate } from "react-router-dom";
import { check_session } from "../../services/LoginService";
import { getImgPath } from "../../utils/imgPathUtil";
import { uploadImg } from "../../services/ImageService";
import { adminSessionCheck } from "../../utils/sessionUtil";

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
  cover: "",
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

  const [allData, setAllData] = useState<Book[]>([]);
  const [filterData, setFilterData] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [disButton, setDisButton] = useState(true);
  const [selectId, setSelectId] = useState<number>(-1);

  const [newBook, setNewBook] = useState<Book>(newData);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [, setUploading] = useState(false);

  useEffect(() => {
    check_session().then((res) => {
      let status = adminSessionCheck(res);
      if (!status.ok)
        message.error(status.msg, 1).then(() => navigation(status.path));
      else
        GetAllBook().then((res) => {
          setAllData(res);
          setFilterData(res);
        });
    });
  }, [navigation]);

  const handleDelete = (key: React.Key) => {
    if (allData.length) {
      const newData = allData.filter((item) => item.id !== key);
      if (key > 0) delBook(key).catch((err) => console.error(err));
      if (key === 0) setDisButton(true);
      setAllData(newData);
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
        newBook.cover
      )
    )
      return -1;
    if (newBook.price <= 0 || newBook.stock < 0) return -2;
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
    setAllData([newData, ...allData]);
    setNewBook(newData);
    setFilterData([newData, ...filterData]);
    setDisButton(false);
  };
  const handleConfirmAdd = async () => {
    if (allData.length) {
      setDisButton(true);
      let status = canAdd();
      switch (status) {
        case 0:
          let response = await addBook(newBook);
          if (!response.ok) {
            message.error("添加失败!", 1);
            return;
          }
          let msg: Msg = await response.json();
          if (msg.status === 0) {
            message.success("添加成功！", 1);
          } else {
            message.error(msg.msg, 1);
          }
          setNewBook(newData);
          break;
        case -1:
          message.error("请填写完整信息！", 1);
          setDisButton(false);
          break;
        case -2:
          message.error("填写信息有误！", 1);
          setDisButton(false);
          break;
      }
    }
  };
  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("请先选择图片！", 1);
      return;
    }
    setUploading(true);
    const res = await uploadImg(fileList[0]);
    if (selectId) {
      const response = await modBookCover(selectId, res.data.path);
      if (!response.ok) {
        message.error(response.statusText, 1);
        return;
      }
    } else {
      setNewBook({ ...newBook, cover: res.data.path });
    }
    let newData = [...allData];
    const index = newData.findIndex((item) => item.id === selectId);
    let item = newData[index];
    let newitem = item;
    newitem.cover = res.data.path;
    newData.splice(index, 1, { ...item, ...newitem });
    setFilterData(newData);
    setAllData(newData);
    setUploading(false);
    setFileList([]);
    setShowModal(false);
  };

  const uploadProps: UploadProps = {
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "封面",
      dataIndex: "cover",
      width: "15%",
      // @ts-ignore
      render: (value, record: Book, index) => (
        <img
          onClick={() => {
            setSelectId(record.id);
            setShowModal(true);
            console.log(getImgPath(value));
          }}
          className={"storage_pic"}
          alt={"img"}
          src={getImgPath(value)}
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
        allData ? (
          allData.length >= 1 ? (
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

  const handleSave = async (row: Book) => {
    let newData = [...allData];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];

    if (item.id === 0) setNewBook(row);
    else if (!equals(row, item)) {
      const response = await modBook(row);
      if (!response.ok) {
        message.error("修改失败!", 1);
        return;
      }
      const msg: Msg = await response.json();
      if (msg.status) {
        message.error(msg.msg, 1);
        return;
      }
      message.success("修改成功", 1);
    }
    newData.splice(index, 1, { ...item, ...row });
    setAllData(newData);
    setFilterData(newData);
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

  if (allData)
    return (
      <div>
        <div className={"order_title"}>
          <Title>{"库存"}</Title>
        </div>
        <div className={"search_bar"}>
          <BookSearch allData={allData} setFilter={setFilterData} />
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
          onOk={handleUpload}
          onCancel={() => setShowModal(false)}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
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
  else return <div></div>;
};
