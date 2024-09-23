import React, { useEffect, useRef } from "react";
import { Card, Avatar, Button } from "antd";
import { Chart } from "@antv/g2";
import { CommentOutlined } from "@ant-design/icons";

interface BarChartCardProps {
  data: any[];
  xField: string;
  yField: string;
  title: string;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
  data,
  xField,
  yField,
  title,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const chart = new Chart({
        container: chartRef.current,
        autoFit: true,
      });

      chart.scale({
        [xField]: {
          type: "timeCat",
          mask: "MMM DD, YYYY", // Format date labels
          tickCount: 5,
        },
        [yField]: {
          alias: "Cases", // Y-axis label
        },
      });

      chart.axis(xField, {
        title: {
          text: "Date",
          style: {
            fontSize: 12,
            fontWeight: "bold",
          },
        },
      });

      chart.axis(yField, {
        title: {
          text: "Cases",
          style: {
            fontSize: 12,
            fontWeight: "bold",
          },
        },
      });

      chart
        .interval()
        .data(data)
        .encode("x", xField)
        .encode("y", yField)
        .interaction("elementHighlight", { background: true });

      chart.render();
      chartInstance.current = chart;
    }
  }, [data, xField, yField]);

  return (
    <Card style={{ width: "100%" }}>
      <div style={{ fontSize: "1rem", fontWeight: 600 }}>{title}</div>
      <div ref={chartRef} style={{ height: 450, width: "100%" }}></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar src="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg" />
        <div style={{ color: "gray" }}>
          <span style={{ marginRight: 8 }}>3</span>
          <CommentOutlined style={{ transform: "scale(1.5)" }} />
        </div>
      </div>
    </Card>
  );
};
