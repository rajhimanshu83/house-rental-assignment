import { Menu } from "antd";

import {
  HomeOutlined,
} from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";

const keys = [
  "/",
];

const menu = [
  <Menu.Item key={keys[0]}>
    <a href={keys[0]}>
      <HomeOutlined />
      <span>Houses</span>
    </a>
  </Menu.Item>
];
export default function mennu({ style, closeDrawer, pageProps }) {
  return (
    <Menu
      theme="dark"
      mode="inline"
      // selectedKeys={selectedKeys}
      style={{ ...style, padding: "16px 0" }}
      onClick={({ key }) => {
        closeDrawer();
        setSymbol(key);
      }}
    >  {menu}
    </Menu>
  );
}
