"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrapingTaskDetailsDialog } from "./utils/scraping-task-details-dialog";

export default function ScrapingSourcesPage() {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const jobs = [
    {
      id: 7,
      projectId: "255c6012-4707-4127-a6f0-cb420fce4dc0",
      userId: 1,
      status: "success",
      name: "Indeed",
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-11-03T15:37:37.228Z",
      updatedAt: "2025-11-03T15:37:57.104Z",
    },
    {
      id: 6,
      projectId: "c46be388-73c1-434e-9952-d0ac88f58a92",
      userId: 1,
      status: "success",
      name: "Indeed",
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-11-03T15:37:10.758Z",
      updatedAt: "2025-11-03T15:37:21.105Z",
    },
    {
      id: 4,
      projectId: "9a0a9007-db5c-4194-936c-71887e66e6f6",
      userId: 1,
      status: "success",
      name: null,
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-10-27T19:34:58.527Z",
      updatedAt: "2025-10-27T19:35:08.464Z",
    },
    {
      id: 3,
      projectId: "fa59c3f6-ab55-46e4-96d5-23fc9ca5bca7",
      userId: 1,
      status: "success",
      name: null,
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-10-27T11:42:53.551Z",
      updatedAt: "2025-10-27T11:43:01.291Z",
    },
    {
      id: 2,
      projectId: "2bea6964-55d1-4a65-81d1-0e6a5bee7a49",
      userId: 1,
      status: "success",
      name: null,
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-10-27T10:30:29.270Z",
      updatedAt: "2025-10-27T10:30:39.000Z",
    },
    {
      id: 1,
      projectId: "4252a82f-846b-48aa-99fb-eeca0317fed0",
      userId: 1,
      status: "success",
      name: null,
      apifyActorId: "misceres/indeed-scraper",
      deletedAt: null,
      createdAt: "2025-10-27T09:53:20.019Z",
      updatedAt: "2025-10-27T10:05:33.687Z",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queue":
        return "bg-secondary/20 text-secondary border-secondary/40";
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "fail":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary">Scraping Sources</h1>
          <p className="text-muted-foreground mt-3 text-base">
            Manage and monitor your job scraping tasks
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="border-t-4 border-t-primary hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {job.name ?? "Unnamed"}
                    </h3>
                    <Badge className={`border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Source:{" "}
                    <span className="font-medium text-foreground">
                      {job.apifyActorId}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Created:{" "}
                    <span className="font-medium text-foreground">
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <Button
                    variant="outline"
                    className="mt-2 border-primary text-primary hover:bg-primary/10 hover:text-primary font-semibold bg-transparent"
                    onClick={() => {
                      setSelectedJobId(job.id.toString());
                      setIsDetailsDialogOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedJobId && (
        <ScrapingTaskDetailsDialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </div>
  );
}
