import React, { useState, useEffect } from "react";
import { fetchSlots } from "../lib/index";
import styled from "styled-components";
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

import moment from "moment";

import {
  Col,
  Card,
  Row,
  Form,
  Typography,
  Empty,
  notification,
  Modal,
  DatePicker,
  Space,
} from "antd";

const { Text } = Typography;
const { Meta } = Card;
const { confirm } = Modal;

export const CardStyled = (props) => (
  <Card bodyStyle={{ padding: "20px 24px 20px" }} bordered={false} {...props} />
);

export const ColStyled = styled(Col)`
  padding-bottom: 12px;
`;

export const ShadowCard = styled(CardStyled)`
  box-shadow: rgba(0, 0, 0, 0.06) 0px 9px 24px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
  border-radius: 3px;
  transition: all 150ms ease-in-out 0s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 24px;
    cursor: pointer;
    transition: all 150ms ease-in-out 0s;
  }
`;

export const CustomFormItem = styled(Form.Item)`
  margin-bottom: 8px;

  &.ant-form-item-with-help {
    margin-bottom: 5px;
  }
`;

export const FormCol = styled(Col)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`;

export const Subtitle = styled(Text)`
  display: block;
  margin-bottom: 12px;
`;

export const EmptyImage = styled(Empty)`
  height: 230px;
  margin: 0;
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.25);

  & .ant-empty-image {
    margin-top: 220px;
  }
`;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

export default function BookSlot({ id, slotdate }) {
  const [slotList, setSlotList] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [slotDate, setSlotDate] = useState(slotdate);
  const router = useRouter();

  const onChangeDate = (date, dateString) => {
    async function fetchSlotData() {
      setLoading(true);
      setSlotDate(dateString);
      let response = await fetchSlots(id, dateString);
      setSlotList(response.availableSlots);
      setLoading(false);
    }
    fetchSlotData();
    router.push(`${id}?slotdate=${dateString}`, undefined, { shallow: true });
  };
  const handleBookSlot = (slot) => {
    confirm({
      title: "Would you like to proceed?",
      icon: <ExclamationCircleOutlined style={{ color: "#000000" }} />,
      content: (
        <>
          <Space>
            <p>
              <strong>Date: </strong> {slotDate}
            </p>
            <p>
              <ClockCircleOutlined /> {slot.startTime}
            </p>
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
          router.push(`/visitation/add/${slot._id}?slotdate=${slotDate}`);
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

  useEffect(() => {
    async function fetchSlotData() {
      let response = await fetchSlots(id, slotdate);
      setSlotList(response.availableSlots);
      setPropertyDetails(response.propertyDetails);
      console.log(response);
      setLoading(false);
    }
    fetchSlotData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Head>
        <title>Available slots</title>
      </Head>
      <div className="container">
        <Row gutter={16}>
          <Col xs={24}>
            <Card
              title={`Slots Available for "${propertyDetails.title}"`}
              extra={
                <>
                  {" "}
                  <DatePicker
                    onChange={onChangeDate}
                    defaultValue={moment(slotDate, "YYYY-MM-DD")}
                    disabledDate={(current) => {
                      return current && current < moment().subtract(1, "d");
                    }}
                  />
                </>
              }
            >
              {slotList.length === 0 && (
                <Empty description={<span>No slot available</span>} />
              )}
              {loading === false &&
                slotList.length > 0 &&
                slotList.map((s) => (
                  <Card.Grid
                    onClick={() => handleBookSlot(s)}
                    style={gridStyle}
                  >
                    <Space direction="vertical">
                      <p>
                        <strong>Duration:</strong> {s.duration} mins
                      </p>
                      <p>
                        <strong>Start Time:</strong> {s.startTime}{" "}
                      </p>
                    </Space>
                  </Card.Grid>
                ))}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

BookSlot.getInitialProps = async (ctx) => {
  return { id: ctx.query.hid, slotdate: ctx.query.slotdate };
};
