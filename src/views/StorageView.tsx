import { BookSearch, CartSearch } from "../components/SearchBar";
import { Books } from "../data";
import { ColumnsType } from "antd/es/table";
import { Book, Good } from "../Interface";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Image, Input, Modal, Popconfirm, Table } from "antd";
import "../css/StorageView.css";
import type { FormInstance } from "antd/es/form";

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
      console.log("Save failed:", errInfo);
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
  const [dataSource, setDataSource] = useState<Book[]>(Books);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(Books.length);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: Book = {
      id: count,
      title: ``,
      author: "",
      ISBN: ``,
      price: 0,
      pics: [],
      pub: "",
      left_number: 0,
      bought_number: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "封面",
      dataIndex: "pics",
      width: "15%",
      //@ts-ignore
      render: (_, record: { pics: string[] }) => (
        <img
          onClick={() => setShowModal(true)}
          className={"storage_pic"}
          alt={record.pics[0]}
          src={record.pics[0]}
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
      title: "ISBN",
      dataIndex: "ISBN",
      editable: true,
    },
    {
      title: "库存",
      dataIndex: "left_number",
      editable: true,
    },
    {
      title: "删除",
      dataIndex: "operation",
      // @ts-ignore
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
            {/*@ts-ignore*/}
          </>
        ) : null,
    },
  ];

  const handleSave = (row: Book) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
    setShowModal(false);
  };

  return (
    <div>
      <div className={"search_bar"}>
        <BookSearch allData={Books} setFilter={setDataSource} />
      </div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        {"添加书籍"}
      </Button>
      <Modal title={"书籍图片"} open={showModal} onOk={HandleOk}></Modal>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};
