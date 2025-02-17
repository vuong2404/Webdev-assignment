"use client";
import React, { useState } from "react";
import {
  DashboardFilled,
  DashboardOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

interface IAppLayout {
  content?: React.ReactNode;
}
const AppLayout: React.FC<IAppLayout> = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: colorBgContainer, position: "fixed", height: 64, width: "100%" }}>
        <Button
          className="ml-1 absolute"
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="text-center">
          <p className="text-[40px]">G-scores</p>
        </div>
      </Header>
      <Layout className="mt-[64]">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="bg-white"
        >
          <div className="h-full flex flex-col">
            <Menu
              className="h-full"
              theme="light"
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              selectedKeys={[firstSegment]}
              items={[
                {
                  key: "dashboard",
                  icon: <DashboardOutlined />,
                  label: "Dashboard",
                  onClick: () => router.push("/dashboard"),
                },
                {
                  key: "search_score",
                  icon: <SearchOutlined />,
                  label: "Search Scores",
                  onClick: () => router.push("/search_score"),
                },
                {
                  key: "reports",
                  icon: <InfoCircleOutlined />,
                  label: "Reports",
                  onClick: () => router.push("/reports"),
                },
                {
                  key: "settings",
                  icon: <UploadOutlined />,
                  label: "Settings",
                  onClick: () => router.push("/settings"),
                },
              ]}
            />
          </div>
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
