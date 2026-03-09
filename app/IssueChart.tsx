"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  statistic: { open: number; inProgress: number; closed: number };
}

const IssueChart = ({ statistic }: Props) => {
  const data = [
    { label: "Open", value: statistic.open },
    { label: "In Progress", value: statistic.inProgress },
    { label: "Closed", value: statistic.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
