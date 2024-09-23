import { Avatar, Button, Card, Flex, Layout } from "antd";
import { useEffect } from "react";
import { CardComponent } from "@/components/CardComponent";
import {
  DownloadOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
// import { fetchCovidData } from "../../api/covid";
// import { renderChart } from "../../utils/charts";

const layoutStyle: React.CSSProperties = {
  display: "flex",
  backgroundColor: "#f7f8f7",
  flexDirection: "row",
  color: "#000",
  padding: "2rem 6rem",
  justifyContent: "space-between",
};

const cardStyle: React.CSSProperties = {
  display: "flex",
  backgroundColor: "#f7f8f7",
  flexDirection: "row",
  color: "#000",
  padding: "2rem 6rem",
  justifyContent: "space-between",
};

const DashboardPage = () => {
  //   useEffect(() => {
  //     const getData = async () => {
  //       const covidData = await fetchCovidData();
  //       // Assuming you have a suitable data structure for chart rendering
  //       renderChart("chart1", covidData);
  //       renderChart("chart2", covidData);
  //     };
  //     getData();
  //   }, []);

  return (
    <Flex style={{ height: "100vh", width: "100vw" }}>
      <Layout>
        <div style={layoutStyle}>
          <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
            Page title
          </span>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button>
              Export to PDF <DownloadOutlined style={{ color: "#238d84" }} />
            </Button>
            <Button>
              Notes<div style={{ color: "gray" }}>(3)</div>
              <AlignLeftOutlined
                style={{
                  rotate: "180deg",
                  transform: "scaleX(-1)",
                  color: "#238d84",
                }}
              />
            </Button>
            <Button>
              Filter
              <div
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  backgroundColor: "#238d84",
                  borderRadius: 16,
                  color: "#FFF",
                  fontSize: ".75rem",
                }}
              >
                9+
              </div>
              <AlignCenterOutlined
                style={{
                  rotate: "180deg",
                  transform: "scaleX(-1)",
                  color: "#238d84",
                }}
              />
            </Button>
          </div>
        </div>
        <div style={layoutStyle}>
          <CardComponent />
        </div>
      </Layout>
    </Flex>
  );
};

export default DashboardPage;
