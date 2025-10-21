"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Play, Pause } from "lucide-react";

interface ScrapingTask {
  id: string;
  name: string;
  sourceType: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  totalUrls: number;
  processedUrls: number;
  jobsCreated: number;
  createdAt: string;
}

export default function ScrapingSourcesPage() {
  const [tasks, setTasks] = useState<ScrapingTask[]>([
    {
      id: "1",
      name: "LinkedIn Tech Jobs",
      sourceType: "linkedin",
      status: "running",
      progress: 65,
      totalUrls: 500,
      processedUrls: 325,
      jobsCreated: 287,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Indeed Sales Positions",
      sourceType: "indeed",
      status: "completed",
      progress: 100,
      totalUrls: 300,
      processedUrls: 300,
      jobsCreated: 245,
      createdAt: "2024-01-14",
    },
  ]);

  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    sourceType: "linkedin",
    urls: "",
  });

  const handleCreateTask = () => {
    if (newTask.name && newTask.urls) {
      const urlArray = newTask.urls.split("\n").filter((url) => url.trim());
      const task: ScrapingTask = {
        id: Date.now().toString(),
        name: newTask.name,
        sourceType: newTask.sourceType,
        status: "pending",
        progress: 0,
        totalUrls: urlArray.length,
        processedUrls: 0,
        jobsCreated: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks([task, ...tasks]);
      setNewTask({ name: "", sourceType: "linkedin", urls: "" });
      setShowNewTask(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Scraping Sources
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your job scraping tasks
          </p>
        </div>
        <Button onClick={() => setShowNewTask(!showNewTask)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      {/* New Task Form */}
      {showNewTask && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Scraping Task</CardTitle>
            <CardDescription>
              Set up a new bulk scraping operation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Task Name</label>
              <Input
                placeholder="e.g., LinkedIn Tech Jobs"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Source Type</label>
              <Select
                value={newTask.sourceType}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, sourceType: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="indeed">Indeed</SelectItem>
                  <SelectItem value="google_jobs">Google Jobs</SelectItem>
                  <SelectItem value="career_page">Career Pages</SelectItem>
                  <SelectItem value="rss">RSS Feeds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">
                URLs (one per line, max 10,000)
              </label>
              <Textarea
                placeholder="https://example.com/jobs&#10;https://example.com/careers&#10;..."
                value={newTask.urls}
                onChange={(e) =>
                  setNewTask({ ...newTask, urls: e.target.value })
                }
                className="mt-1 h-32"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newTask.urls.split("\n").filter((url) => url.trim()).length}{" "}
                URLs
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateTask}>Create Task</Button>
              <Button variant="outline" onClick={() => setShowNewTask(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {task.name}
                    </h3>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Source: {task.sourceType} • Created: {task.createdAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    {task.status === "running" ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{task.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total URLs</p>
                  <p className="font-semibold text-foreground">
                    {task.totalUrls}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Processed</p>
                  <p className="font-semibold text-foreground">
                    {task.processedUrls}/{task.totalUrls}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Jobs Created</p>
                  <p className="font-semibold text-foreground">
                    {task.jobsCreated}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
