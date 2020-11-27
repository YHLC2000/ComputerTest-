import React, { useState } from "react";
import { Table, Popconfirm, Modal } from "antd";
import { Button } from "antd";

const List = ({ data, onDelete, onEdit }) => {
  const [visible, setVisible] = useState(false);
  const [curret, setCurret] = useState({});

  const columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "名字",
      dataIndex: "name"
    },
    {
      title: "待办事项",
      dataIndex: "todo"
    },
    {
      title: "操作",
      render: (record) => {
        return (
          <>
            <Button type="link" onClick={onEdit.bind(this, record)}>
              更改
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={onDelete.bind(this, record.id)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            <Button
              type="link"
              onClick={() => {
                setVisible(true);
                setCurret(record);
              }}
            >
              查看
            </Button>
          </>
        );
      }
    }
  ]

  return (
    <>
      <Table rowKey="id" dataSource={data} columns={columns} />
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        {curret.name}
        {curret.todo}
      </Modal>
    </>
  );
};
export default List;
