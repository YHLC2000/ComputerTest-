import React, { useCallback, useState, useRef } from "react";
import { useLocalStorage } from "react-use";
import { v1 as uuid } from "uuid";
import { Button } from "antd";
import Table from "./components/List";
import Form from "./components/Form";
import "antd/dist/antd.css";

const defaultData = [
  {
    id: uuid(),
    name: "张三",
    todo: "回家"
  },
  {
    id: uuid(),
    name: "张四",
    todo: "回家"
  }
];

function App() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const isEdit = useRef(false);
  const [data, setData] = useLocalStorage("DATA_SOURCE", defaultData);

  const handleDelete = useCallback(
    (id) => {
      setData(data.filter((_) => id !== _.id));
    },
    [data, setData]
  );

  const handleCreate = useCallback(
    (item) => {
      if (isEdit.current) {
        const result = data.map((_) => {
          if (_.id === current.id) {
            return {
              ..._,
              ...item
            };
          }
          return _;
        });

        setData([...result]);
        setCurrent({});
      } else {
        item.id = uuid();
        setData(data.concat(item));
      }
    },
    [data, setData, current, setCurrent]
  );

  const handleShow = useCallback(() => setVisible(true), [setVisible]);
  const handleClose = useCallback(() => setVisible(false), [setVisible]);

  const handleEdit = useCallback(
    (item) => {
      setCurrent(item);
      handleShow();
      isEdit.current = true;
    },
    [setCurrent, handleShow]
  );

  return (
    <>
      <Button
        onClick={() => {
          isEdit.current = false;
          handleShow();
        }}
      >
        Add
      </Button>
      <Table data={data} onDelete={handleDelete} onEdit={handleEdit} />

      {visible ? (
        <Form
          visible={visible}
          defaultValue={current}
          onCreate={handleCreate}
          onClose={handleClose}
        />
      ) : null}
    </>
  );
}

export default App;
