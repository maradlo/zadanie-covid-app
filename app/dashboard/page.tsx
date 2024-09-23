"use client";

import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { BarChartCard } from "@/components/BarChartCard";
import { PieChartCard } from "@/components/PieChartCard";
import axios from "axios";
import {
  DownloadOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";

const layoutStyle: React.CSSProperties = {
  display: "flex",
  backgroundColor: "#f7f8f7",
  flexDirection: "column",
  color: "#000",
  padding: "2rem 6rem",
};

const DashboardPage = () => {
  const [casesData, setCasesData] = useState<any[]>([]);
  const [deathsData, setDeathsData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const casesResponse = await axios.get("/api/covid/cases");
        const casesResults = casesResponse.data.message.results;

        const parsedCasesData = casesResults.map((item: any) => ({
          ...item,
          date: item.date,
          Cases: item.metric_value,
        }));

        setCasesData(parsedCasesData);

        const deathsResponse = await axios.get("/api/covid/deaths");
        const deathsResults = deathsResponse.data.message.results;

        const aggregatedDeathsData = deathsResults.reduce(
          (acc: any, item: any) => {
            const date = new Date(item.date);
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            const monthName = date.toLocaleString("en", { month: "long" });
            const key = `${monthName} ${year}`;

            if (!acc[key]) {
              acc[key] = {
                month: key,
                Deaths: 0,
              };
            }
            acc[key].Deaths += item.metric_value;
            return acc;
          },
          {}
        );

        const parsedDeathsData = Object.values(aggregatedDeathsData);

        setDeathsData(parsedDeathsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, []);

  return (
    <Layout style={layoutStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>Dashboard</span>
        <div style={{ display: "flex", gap: "1rem" }}>
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
      <div style={{ display: "flex", gap: "20px", marginTop: "2rem" }}>
        <BarChartCard
          data={casesData}
          xField="date"
          yField="Cases"
          title="COVID-19 Cases by Day"
        />
        <PieChartCard
          data={deathsData}
          xField="month"
          yField="Deaths"
          title="COVID-19 Deaths by Month"
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;
