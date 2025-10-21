"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  sourceType: string;
  postedDate: string;
  industry: string;
}

export default function JobListingsPage() {
  const [jobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$150k - $200k",
      sourceType: "linkedin",
      postedDate: "2024-01-15",
      industry: "Technology",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "StartUp Inc",
      location: "New York, NY",
      salary: "$120k - $160k",
      sourceType: "indeed",
      postedDate: "2024-01-14",
      industry: "Technology",
    },
    {
      id: "3",
      title: "Sales Executive",
      company: "Enterprise Co",
      location: "Chicago, IL",
      salary: "$100k - $140k",
      sourceType: "google_jobs",
      postedDate: "2024-01-13",
      industry: "Sales",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case "linkedin":
        return "bg-blue-100 text-blue-800";
      case "indeed":
        return "bg-purple-100 text-purple-800";
      case "google_jobs":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Listings</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage discovered job postings
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Jobs table */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="outline">{job.salary}</Badge>
                    <Badge className={getSourceBadgeColor(job.sourceType)}>
                      {job.sourceType}
                    </Badge>
                    <Badge variant="outline">{job.industry}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {job.postedDate}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
