"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, Avatar, Button } from "antd";
import axios from "axios";
import { Chart } from "@antv/g2";

const renderChart = (
  containerElement: HTMLElement,
  data: any[],
  xField: string,
  yField: string,
  chartInstanceRef: React.MutableRefObject<any>
) => {
  if (chartInstanceRef.current) {
    chartInstanceRef.current.destroy();
  }

  const chart = new Chart({
    container: containerElement,
    autoFit: true,
  });

  chart.scale({
    [xField]: { type: "timeCat" },
  });

  chart
    .interval()
    .data(data)
    .encode("x", xField)
    .encode("y", yField)
    .interaction("elementHighlight", { background: true });

  chart.render();

  chartInstanceRef.current = chart;
};

export const CardComponent = () => {
  const [casesData, setCasesData] = useState<any[]>([]);
  const [deathsData, setDeathsData] = useState<any[]>([]);
  const chartCasesRef = useRef<HTMLDivElement>(null);
  const chartDeathsRef = useRef<HTMLDivElement>(null);

  const chartCasesInstance = useRef<any>(null);
  const chartDeathsInstance = useRef<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const casesResponse = await axios.get("/api/covid/cases");
        console.log("casesResponse.data:", casesResponse.data);

        const casesResults = casesResponse.data.message.results;

        const parsedCasesData = casesResults.map((item: any) => ({
          ...item,
          date: item.date,
        }));

        setCasesData(parsedCasesData);

        const deathsResponse = await axios.get("/api/covid/deaths");
        console.log("deathsResponse.data:", deathsResponse.data);

        const deathsResults = deathsResponse.data.message.results;

        const parsedDeathsData = deathsResults.map((item: any) => ({
          ...item,
          date: item.date,
        }));

        setDeathsData(parsedDeathsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (casesData.length > 0 && chartCasesRef.current) {
      renderChart(
        chartCasesRef.current,
        casesData,
        "date",
        "metric_value",
        chartCasesInstance
      );
    }

    if (deathsData.length > 0 && chartDeathsRef.current) {
      renderChart(
        chartDeathsRef.current,
        deathsData,
        "date",
        "metric_value",
        chartDeathsInstance
      );
    }
  }, [casesData, deathsData]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Card for COVID-19 Cases */}
      <Card style={{ width: "100%" }}>
        <div>COVID-19 Cases by Day</div>
        <div ref={chartCasesRef} style={{ height: 300, width: "100%" }}></div>
        <Avatar src="https://example.com/dummy-avatar.png" />
        <Button>Dummy Button</Button>
      </Card>

      {/* Card for COVID-19 Deaths */}
      <Card style={{ width: "100%" }}>
        <div>COVID-19 Deaths by Day</div>
        <div ref={chartDeathsRef} style={{ height: 300, width: "100%" }}></div>
        <Avatar src="https://example.com/dummy-avatar.png" />
        <Button>Dummy Button</Button>
      </Card>
    </div>
  );
};
