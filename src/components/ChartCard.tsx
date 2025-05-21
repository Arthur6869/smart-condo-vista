
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { ChartData } from "@/types";

type ChartType = "line" | "bar" | "area" | "pie";

interface ChartCardProps {
  title: string;
  data: ChartData;
  type: ChartType;
  height?: number;
  description?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  type,
  height = 300,
  description
}) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data.labels.map((label, index) => {
              const dataPoint: Record<string, any> = { name: label };
              data.datasets.forEach((dataset, i) => {
                dataPoint[dataset.label] = dataset.data[index];
              });
              return dataPoint;
            })}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={Array.isArray(dataset.borderColor) ? dataset.borderColor[0] : dataset.borderColor}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data.labels.map((label, index) => {
              const dataPoint: Record<string, any> = { name: label };
              data.datasets.forEach((dataset, i) => {
                dataPoint[dataset.label] = dataset.data[index];
              });
              return dataPoint;
            })}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Bar
                  key={index}
                  dataKey={dataset.label}
                  fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data.labels.map((label, index) => {
              const dataPoint: Record<string, any> = { name: label };
              data.datasets.forEach((dataset, i) => {
                dataPoint[dataset.label] = dataset.data[index];
              });
              return dataPoint;
            })}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor}
                  stroke={Array.isArray(dataset.borderColor) ? dataset.borderColor[0] : dataset.borderColor}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        const dataset = data.datasets[0];
        const pieData = data.labels.map((label, index) => ({
          name: label,
          value: dataset.data[index]
        }));
        
        const COLORS = Array.isArray(dataset.backgroundColor) 
          ? dataset.backgroundColor 
          : ["#2563eb", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
        
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Tipo de gráfico não suportado</div>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
