// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import React from "react";
import App from "next/app";

import "../styles/antd.less";
import Layout from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Layout collapsed={true}>
    <Component {...pageProps} />
  </Layout>
  }
}

export default MyApp;
