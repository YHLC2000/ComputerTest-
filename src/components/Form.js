import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input } from "antd";

const Create = ({ visible, onClose, onCreate, defaultValue }) => {
  const value = defaultValue || {};
  const [name, setName] = useState(value.name);
  const [todo, setTodo] = useState(value.todo);

  const handleSubmit = () => {
    onCreate({
      todo,
      name
    });

    onClose();
  };

  return (
    <>
      <Drawer
        title="信息"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right"
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={handleSubmit} type="primary">
              提交
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="名字"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="年龄"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Create;
