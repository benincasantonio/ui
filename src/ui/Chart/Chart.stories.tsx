import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "./Chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card/Card";
import { DollarSign, Users, TrendingUp } from "lucide-react";

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A powerful charting wrapper around Recharts with theme-aware styles, custom tooltip and legend content, and full accessibility support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    config: {
      description: "Configuration object defining chart data keys, labels, colors, and themes",
      control: "object",
    },
    className: {
      control: "text",
      description: "Custom CSS classes for styling the chart container",
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// Sample data for demonstrations
const monthlyData = [
  { month: "Jan", sales: 4000, revenue: 2400, customers: 240 },
  { month: "Feb", sales: 3000, revenue: 1398, customers: 198 },
  { month: "Mar", sales: 2000, revenue: 9800, customers: 380 },
  { month: "Apr", sales: 2780, revenue: 3908, customers: 290 },
  { month: "May", sales: 1890, revenue: 4800, customers: 320 },
  { month: "Jun", sales: 2390, revenue: 3800, customers: 280 },
  { month: "Jul", sales: 3490, revenue: 4300, customers: 350 },
];

const categoryData = [
  { name: "Desktop", value: 400, color: "#3b82f6" },
  { name: "Mobile", value: 300, color: "#ef4444" },
  { name: "Tablet", value: 200, color: "#10b981" },
  { name: "Other", value: 100, color: "#f59e0b" },
];

/**
 * Basic line chart with two data series showing sales and revenue over time.
 */
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <ChartContainer
        className="h-80 w-full"
        config={{
          sales: { label: "Sales", color: "#3b82f6" },
          revenue: { label: "Revenue", color: "#ef4444" },
        }}
      >
        <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
          <Legend verticalAlign="top" content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-sales)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};

/**
 * Bar chart showing monthly sales data with custom colors and styling.
 */
export const BarChartExample: Story = {
  render: () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Sales performance for the last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-80 w-full"
          config={{
            sales: { label: "Sales", color: "#10b981" },
          }}
        >
          <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bar chart wrapped in a Card component, demonstrating integration with other UI components.",
      },
    },
  },
};

/**
 * Area chart with gradient fill showing trend data over time.
 */
export const AreaChartExample: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <ChartContainer
        className="h-80 w-full"
        config={{
          sales: { label: "Sales", color: "#8b5cf6" },
          revenue: { label: "Revenue", color: "#ec4899" },
        }}
      >
        <AreaChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend verticalAlign="top" content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="var(--color-sales)"
            fill="url(#colorSales)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Area chart with gradient fills for visual appeal and better data representation.",
      },
    },
  },
};

/**
 * Pie chart showing category distribution with custom colors.
 */
export const PieChartExample: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Device Distribution</CardTitle>
        <CardDescription>Traffic by device type</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-80 w-full"
          config={{
            desktop: { label: "Desktop", color: "#3b82f6" },
            mobile: { label: "Mobile", color: "#ef4444" },
            tablet: { label: "Tablet", color: "#10b981" },
            other: { label: "Other", color: "#f59e0b" },
          }}
        >
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pie chart with percentage labels showing distribution across categories.",
      },
    },
  },
};

/**
 * Chart with theme-aware colors that adapt to light/dark mode.
 */
export const WithThemeColors: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Light Mode</h3>
        <ChartContainer
          className="h-64 w-full"
          config={{
            sales: {
              label: "Sales",
              theme: { light: "#0369a1", dark: "#60a5fa" },
            },
            revenue: {
              label: "Revenue",
              theme: { light: "#7c2d12", dark: "#fb7185" },
            },
          }}
        >
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Legend verticalAlign="top" content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="dark">
        <h3 className="mb-4 text-lg font-semibold text-white">Dark Mode</h3>
        <ChartContainer
          className="h-64 w-full"
          config={{
            sales: {
              label: "Sales",
              theme: { light: "#0369a1", dark: "#60a5fa" },
            },
            revenue: {
              label: "Revenue",
              theme: { light: "#7c2d12", dark: "#fb7185" },
            },
          }}
        >
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Legend verticalAlign="top" content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates theme-aware colors. The same chart config produces different colors in light and dark modes.",
      },
    },
  },
};

/**
 * Tooltip with different indicator styles: dot, line, and dashed.
 */
export const TooltipIndicators: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Dot Indicator</h3>
        <ChartContainer
          className="h-48 w-full"
          config={{
            sales: { label: "Sales", color: "#3b82f6" },
          }}
        >
          <LineChart
            data={monthlyData.slice(0, 5)}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" />
          </LineChart>
        </ChartContainer>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Line Indicator</h3>
        <ChartContainer
          className="h-48 w-full"
          config={{
            sales: { label: "Sales", color: "#ef4444" },
          }}
        >
          <LineChart
            data={monthlyData.slice(0, 5)}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="line" />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" />
          </LineChart>
        </ChartContainer>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Dashed Indicator</h3>
        <ChartContainer
          className="h-48 w-full"
          config={{
            sales: { label: "Sales", color: "#10b981" },
          }}
        >
          <LineChart
            data={monthlyData.slice(0, 5)}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of different tooltip indicator styles available in ChartTooltipContent.",
      },
    },
  },
};

/**
 * Chart with custom icons in the legend.
 */
export const WithCustomIcons: Story = {
  render: () => (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Business Metrics</CardTitle>
        <CardDescription>Key performance indicators over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-80 w-full"
          config={{
            sales: { label: "Sales", color: "#3b82f6", icon: DollarSign },
            customers: { label: "Customers", color: "#10b981", icon: Users },
            revenue: { label: "Revenue", color: "#f59e0b", icon: TrendingUp },
          }}
        >
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="var(--color-customers)"
              strokeWidth={2}
            />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chart legend with custom icons from lucide-react for better visual identification.",
      },
    },
  },
};

/**
 * Multiple chart types in a dashboard layout.
 */
export const DashboardLayout: Story = {
  render: () => (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue growth</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-64 w-full"
            config={{
              revenue: { label: "Revenue", color: "#3b82f6" },
            }}
          >
            <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                fill="url(#revGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
          <CardDescription>New customers per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-64 w-full"
            config={{
              customers: { label: "Customers", color: "#10b981" },
            }}
          >
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="customers" fill="var(--color-customers)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Comprehensive Overview</CardTitle>
          <CardDescription>All metrics combined</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-80 w-full"
            config={{
              sales: { label: "Sales", color: "#3b82f6" },
              revenue: { label: "Revenue", color: "#ef4444" },
              customers: { label: "Customers", color: "#10b981" },
            }}
          >
            <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="var(--color-customers)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Multiple charts arranged in a dashboard layout showing different chart types and data.",
      },
    },
  },
};

/**
 * Responsive chart that adapts to different container sizes.
 */
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Responsive Chart</CardTitle>
          <CardDescription>Chart automatically adjusts to container width</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-96 w-full"
            config={{
              sales: { label: "Sales", color: "#3b82f6" },
              revenue: { label: "Revenue", color: "#ef4444" },
            }}
          >
            <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <p className="text-muted-foreground text-sm">
        Try resizing your browser window to see the chart adapt to different widths.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chart automatically scales to fit its container using ResponsiveContainer from Recharts.",
      },
    },
  },
};
