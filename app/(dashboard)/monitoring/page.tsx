"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { CheckCircle, Clock } from "lucide-react";

const healthData = [
  { time: "00:00", scraper: 98, apollo: 99, openai: 97 },
  { time: "04:00", scraper: 95, apollo: 98, openai: 96 },
  { time: "08:00", scraper: 92, apollo: 97, openai: 95 },
  { time: "12:00", scraper: 96, apollo: 99, openai: 98 },
  { time: "16:00", scraper: 94, apollo: 96, openai: 94 },
  { time: "20:00", scraper: 97, apollo: 98, openai: 97 },
  { time: "24:00", scraper: 99, apollo: 99, openai: 99 },
];

const queueData = [
  { time: "00:00", depth: 120 },
  { time: "04:00", depth: 340 },
  { time: "08:00", depth: 520 },
  { time: "12:00", depth: 280 },
  { time: "16:00", depth: 450 },
  { time: "20:00", depth: 180 },
  { time: "24:00", depth: 95 },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Monitoring Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time system health and performance metrics
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scraper Health
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99%</div>
            <p className="text-xs text-muted-foreground">Uptime last 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">All Green</div>
            <p className="text-xs text-muted-foreground">
              Apollo, OpenAI, Apify
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Depth</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">Jobs pending</p>
          </CardContent>
        </Card>
      </div>

      {/* API Status Details */}
      <Card>
        <CardHeader>
          <CardTitle>API Integration Status</CardTitle>
          <CardDescription>
            Real-time status of external integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Apollo.io</p>
                <p className="text-sm text-muted-foreground">
                  Contact enrichment API
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Operational
                </Badge>
                <span className="text-sm text-muted-foreground">
                  98% uptime
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-foreground">OpenAI</p>
                <p className="text-sm text-muted-foreground">
                  Embeddings & GPT API
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Operational
                </Badge>
                <span className="text-sm text-muted-foreground">
                  99% uptime
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-foreground">Apify</p>
                <p className="text-sm text-muted-foreground">
                  Web scraping service
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Operational
                </Badge>
                <span className="text-sm text-muted-foreground">
                  99% uptime
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Health Trend</CardTitle>
            <CardDescription>Last 24 hours uptime percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                scraper: { label: "Scraper", color: "hsl(var(--chart-1))" },
                apollo: { label: "Apollo", color: "hsl(var(--chart-2))" },
                openai: { label: "OpenAI", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[90, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="scraper"
                    stroke="var(--color-scraper)"
                  />
                  <Line
                    type="monotone"
                    dataKey="apollo"
                    stroke="var(--color-apollo)"
                  />
                  <Line
                    type="monotone"
                    dataKey="openai"
                    stroke="var(--color-openai)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Queue Depth</CardTitle>
            <CardDescription>Pending jobs in queue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                depth: { label: "Queue Depth", color: "hsl(var(--chart-4))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={queueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="depth"
                    fill="var(--color-depth)"
                    stroke="var(--color-depth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>System notifications and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg bg-blue-50">
              <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">High Queue Depth</p>
                <p className="text-sm text-muted-foreground">
                  Queue depth exceeded 500 jobs at 16:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">System Recovered</p>
                <p className="text-sm text-muted-foreground">
                  All systems back to normal at 20:00
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
