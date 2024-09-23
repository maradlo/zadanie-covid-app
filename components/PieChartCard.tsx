import React, { useEffect, useRef } from "react";
import { Card, Avatar } from "antd";
import { Chart } from "@antv/g2";
import { CommentOutlined } from "@ant-design/icons";

interface DeathsDataItem {
  month: string;
  Deaths: number;
}

interface PieChartCardProps {
  data: DeathsDataItem[];
  xField: keyof DeathsDataItem;
  yField: keyof DeathsDataItem;
  title: string;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  data,
  xField,
  yField,
  title,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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
        [yField]: {
          alias: "Deaths",
        },
      });

      chart
        .coordinate({ type: "theta", innerRadius: 0 })
        .interval()
        .data(data)
        .encode("x", xField)
        .encode("y", yField)
        .encode("color", xField)
        .legend("color", { position: "right", title: null })
        .label({
          text: (datum: DeathsDataItem) => `${datum[xField]}: ${datum[yField]}`,
          position: "outside",
          style: { fill: "#000" },
        });

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
