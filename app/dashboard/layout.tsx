"use client";

import { Flex, Layout } from "antd";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "start",
  color: "#fff",
  fontSize: 24,
  paddingInline: 48,
  fontWeight: "600",
  lineHeight: "64px",
  backgroundColor: "#000",
};

const layoutStyle: React.CSSProperties = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex style={{ height: "100vh", width: "100vw" }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>COVID19 app</Header>
        <Content>{children}</Content>
      </Layout>
    </Flex>
  );
}
