"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Activity, Zap, Users, FileText } from "lucide-react";

const jobsData = [
  { date: "Mon", jobs: 120, contacts: 45 },
  { date: "Tue", jobs: 150, contacts: 62 },
  { date: "Wed", jobs: 180, contacts: 78 },
  { date: "Thu", jobs: 165, contacts: 71 },
  { date: "Fri", jobs: 200, contacts: 95 },
  { date: "Sat", jobs: 140, contacts: 52 },
  { date: "Sun", jobs: 110, contacts: 38 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Jobs
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Contacts Found
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,243</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Tasks
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground">2 running, 3 queued</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Enrichment Rate
            </CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground">Contacts verified</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-primary">
              Jobs & Contacts Trend
            </CardTitle>
            <CardDescription>Last 7 days activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                jobs: { label: "Jobs", color: "hsl(var(--primary))" },
                contacts: { label: "Contacts", color: "hsl(var(--secondary))" },
              }}
              className="h-80 max-w-lg w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={jobsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="jobs"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="contacts"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-primary">Top Industries</CardTitle>
            <CardDescription>Jobs by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                jobs: { label: "Jobs", color: "hsl(var(--primary))" },
              }}
              className="h-80 max-w-lg w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { industry: "Tech", jobs: 450 },
                    { industry: "Finance", jobs: 320 },
                    { industry: "Sales", jobs: 280 },
                    { industry: "Marketing", jobs: 210 },
                    { industry: "HR", jobs: 180 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="industry" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="jobs"
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
