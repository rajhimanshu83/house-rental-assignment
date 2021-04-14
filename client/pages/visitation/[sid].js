import React, { useState, useEffect } from "react";
import Head from "next/head";
import moment from "moment";
import Loading from "../../components/Loading";

import { fetchBookedSlot } from "../../lib/index";
import { Col, Card, Row, Space } from "antd";

import { EnvironmentOutlined } from "@ant-design/icons";

export default function BookedVisitation({ id }) {
  const [slotDetails, setSlotDetails] = useState({});
  const [propertyDetails, setPropertyDetails] = useState({});
  const [visitationDetails, setVisitationDetails] = useState({});
  const [realtorDetails, setRealtorDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBookedSlotData() {
      let response = await fetchBookedSlot(id);
      setSlotDetails(response.slot);
      setPropertyDetails(response.property);
      setVisitationDetails(response.visitation);
      setRealtorDetails(response.realtor);
      setLoading(false);
    }
    fetchBookedSlotData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Head>
        <title>Visitation Details</title>
      </Head>
      <div className="container">
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Visitation Details">
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
                    <strong>Tenant:</strong> {visitationDetails.name}
                  </span>
                  <span>
                    <strong>Realtor:</strong> {realtorDetails.name}{" "}
                  </span>
                  <span>
                    <strong>Duration:</strong> {slotDetails.duration} mins
                  </span>
                  <span>
                    <strong>Start Time:</strong> {slotDetails.startTime}{" "}
                  </span>
                  <span>
                    <strong>Date:</strong>{" "}
                    {moment(visitationDetails.visitDate).format("YYYY-MM-DD")}{" "}
                  </span>
                </Space>
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

BookedVisitation.getInitialProps = async (ctx) => {
  return { id: ctx.query.sid };
};
