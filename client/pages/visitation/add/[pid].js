import React, { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";
import { fetchSlot, bookSlot } from "../../../lib/index";
import Loading from "../../../components/Loading";

import {
  Col,
  Card,
  Row,
  Form,
  Input,
  Button,
  Select,
  message,
  notification,
  Space,
} from "antd";
const { Option } = Select;
import { EnvironmentOutlined } from "@ant-design/icons";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const prefixSelector = (
  <Form.Item initialValue="91" name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="91">+91</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

export default function Visitation({ id, slotdate }) {
  const [slotDetails, setSlotDetails] = useState({});
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    async function fetchSlotData() {
      let response = await fetchSlot(id);
      setSlotDetails(response.slot);
      setPropertyDetails(response.propertyDetails);
      setLoading(false);
    }
    fetchSlotData();
  }, []);

  const onFinish = async (values) => {
    const data = {};
    data.name = values.user.name;
    data.phone = `+${values.prefix}${values.phone}`;
    data.email = values.user.email;
    data.slot = slotDetails._id;
    data.propertyId = propertyDetails._id;
    data.visitDate = moment(slotdate).toDate();
    try {
      const response = await bookSlot(data);
      if (response.done === false) {
        return notification.error({
          message: "Error",
          description: response.message,
        });
      }
      message.success("Slot Booked successfully!", 2);
      router.push(`/visitation/${response.slotBooked._id}`);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to book Slot",
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Head>
        <title>Book Slot</title>
      </Head>
      <div className="container">
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Enter Your Contact Details">
              <Form
                {...formItemLayout}
                name="validate_other"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
              >
                <Form.Item name={["slot"]} label="Slot and Property Details">
                  <Card
                    style={{ marginBottom: 16 }}
                    type="inner"
                    title={propertyDetails.title}
                  >
                    <Space direction="vertical">
                      <span>
                        <EnvironmentOutlined /> {propertyDetails.address}
                      </span>
                      <span>
                        <strong>Duration:</strong> {slotDetails.duration} mins
                      </span>
                      <span>
                        <strong>Start Time:</strong> {slotDetails.startTime}{" "}
                      </span>
                      <span>
                        <strong>Date:</strong> {slotdate}{" "}
                      </span>
                    </Space>
                  </Card>
                </Form.Item>

                <Form.Item
                  name={["user", "name"]}
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "email"]}
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value = "") {
                        if (value.length > 10) {
                          return Promise.reject("Enter vaild phone number");
                        }
                        if (value.length === 0) {
                          return Promise.reject("Phone number is required");
                        }
                        if (value.length > 0 && value.length < 10) {
                          return Promise.reject("10 digit long");
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    span: 12,
                    offset: 6,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Visitation.getInitialProps = async (ctx) => {
  return { id: ctx.query.pid, slotdate: ctx.query.slotdate };
};
