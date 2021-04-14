import { Layout, Dropdown, Menu, Avatar } from "antd";
const { Header } = Layout;
import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`;

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`;


export default function header({ collapsed, handleToggle, user }) {
  const router = useRouter();
  return (
    <Header
      style={{
        background: "#fff",
        padding: 0,
        boxShadow: "0 1px 4px rgba(0,21,41,.08)",
        display: "flex",
      }}
    >
      <TriggerBlock>
        {collapsed ? (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={handleToggle}
            style={{
              fontSize: 20,
              verticalAlign: "middle",
              padding: "0 24px",
            }}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger"
            onClick={handleToggle}
            style={{
              fontSize: 20,
              verticalAlign: "middle",
              padding: "0 24px",
            }}
          />
        )}
      </TriggerBlock>
      <div style={{fontSize:"25px"}}>House Rentals</div>
    </Header>
  );
}
