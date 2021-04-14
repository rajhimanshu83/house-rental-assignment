import React, { useState, useEffect, useRef } from "react";

import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { fetchHouses } from "../lib/index";
import Loading from "../components/Loading";

import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";

import { Col, Card, Row, List, Modal, DatePicker, Space } from "antd";

const { Meta } = Card;
const { confirm } = Modal;

export default function Home() {
  const [itemList, setItemList] = useState([]);
  const [showType, setShowType] = useState("grid");
  const [loading, setLoading] = useState(true);
  const dateRef = useRef(moment().format("YYYY-MM-DD"));
  const [slotDate, setSlotDate] = useState(moment().format("YYYY-MM-DD"));
  const router = useRouter();

  useEffect(() => {
    async function fetchItems() {
      let response = await fetchHouses();
      setItemList(response);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const onChangeDate = (date, dateString) => {
    dateRef.current = dateString;
  };

  const handleHouseClick = (Iid) => {
    confirm({
      title: "Select suitable date to book Slot.",
      icon: <ClockCircleOutlined style={{ color: "#000000" }} />,
      content: (
        <>
          <h2>{Iid.title}</h2>
          <p>
            <EnvironmentOutlined /> {Iid.address}
          </p>
          <Space direction="vertical">
            <DatePicker
              onChange={onChangeDate}
              defaultValue={moment()}
              disabledDate={(current) => {
                return current && current < moment().subtract(1, "d");
              }}
            />
          </Space>
        </>
      ),
      style: { top: 110 },
      maskClosable: true,
      okText: "Confirm",
      okButtonProps: {
        style: {
          background: "#295fd2",
        },
      },
      onOk: async () => {
        try {
          router.push(`${Iid._id}?slotdate=${dateRef.current}`);
        } catch (error) {
          console.log(error);
          notification.error({
            message: "Error",
            description: "Something went wrong",
          });
        }
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Head>
        <title>All Houses</title>
      </Head>
      <div className="container">
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Houses">
              {showType === "grid" && (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={itemList}
                  renderItem={(item) => (
                    <List.Item onClick={() => handleHouseClick(item)}>
                      <Card
                        hoverable
                        style={{ borderRadius: "10px" }}
                        cover={
                          <img
                            alt="example"
                            style={{ borderRadius: "10px" }}
                            src="https://i0.wp.com/s-media-cache-ak0.pinimg.com/originals/d5/43/c6/d543c65daf019fe2a3e0552f4deb24ed.jpg?resize=650,400"
                          />
                        }
                      >
                        <Meta title={item.title} description={item.address} />
                      </Card>
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
