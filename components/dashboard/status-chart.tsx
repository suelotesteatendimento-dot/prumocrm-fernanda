"use client";

import { memo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardChartItem } from "@/lib/dashboard/summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartColors: Record<DashboardChartItem["status"], string> = {
  em_aberto: "#C8B08A",
  follow_up: "#B7996E",
  aprovado: "#111111",
  reprovado: "#6E675F"
};

export const StatusChart = memo(function StatusChart({
  data
}: {
  data: DashboardChartItem[];
}) {
  return (
    <Card className="h-full border-brand-300/50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Leads por status</CardTitle>
        <CardDescription>
          Distribuição atual do funil comercial da clínica.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={42}>
            <CartesianGrid stroke="rgba(110, 103, 95, 0.10)" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#6E675F" />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="#6E675F" />
            <Tooltip
              cursor={{ fill: "rgba(200, 176, 138, 0.08)" }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(200, 176, 138, 0.28)",
                background: "#fffdf9",
                boxShadow: "0 18px 30px -24px rgba(17,17,17,0.2)"
              }}
            />
            <Bar dataKey="total" radius={[10, 10, 0, 0]}>
              {data.map((item) => (
                <Cell key={item.status} fill={chartColors[item.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
