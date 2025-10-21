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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Download, Mail, Trash2 } from "lucide-react";

interface Report {
  id: string;
  name: string;
  reportType: string;
  format: string;
  generatedAt: string;
  jobsProcessed: number;
  contactsAdded: number;
  emailSent: boolean;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Weekly Summary - Jan 15",
      reportType: "summary",
      format: "csv",
      generatedAt: "2024-01-15",
      jobsProcessed: 2847,
      contactsAdded: 1243,
      emailSent: true,
    },
    {
      id: "2",
      name: "Jobs Processed - Jan 14",
      reportType: "jobs_processed",
      format: "pdf",
      generatedAt: "2024-01-14",
      jobsProcessed: 450,
      contactsAdded: 0,
      emailSent: false,
    },
  ]);

  const [showNewReport, setShowNewReport] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    reportType: "summary",
    format: "csv",
    emailRecipients: "",
  });

  const handleCreateReport = () => {
    if (newReport.name) {
      const report: Report = {
        id: Date.now().toString(),
        name: newReport.name,
        reportType: newReport.reportType,
        format: newReport.format,
        generatedAt: new Date().toISOString().split("T")[0],
        jobsProcessed: Math.floor(Math.random() * 3000),
        contactsAdded: Math.floor(Math.random() * 1500),
        emailSent: newReport.emailRecipients.length > 0,
      };
      setReports([report, ...reports]);
      setNewReport({
        name: "",
        reportType: "summary",
        format: "csv",
        emailRecipients: "",
      });
      setShowNewReport(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Generate and manage automated reports
          </p>
        </div>
        <Button
          onClick={() => setShowNewReport(!showNewReport)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* New Report Form */}
      {showNewReport && (
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>
              Create a new report for jobs and contacts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Report Name</label>
              <Input
                placeholder="e.g., Weekly Summary"
                value={newReport.name}
                onChange={(e) =>
                  setNewReport({ ...newReport, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Report Type</label>
              <Select
                value={newReport.reportType}
                onValueChange={(value) =>
                  setNewReport({ ...newReport, reportType: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="jobs_processed">Jobs Processed</SelectItem>
                  <SelectItem value="contacts_added">Contacts Added</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Format</label>
              <Select
                value={newReport.format}
                onValueChange={(value) =>
                  setNewReport({ ...newReport, format: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="email">Email Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Email Recipients (optional)
              </label>
              <Input
                placeholder="email@example.com, another@example.com"
                value={newReport.emailRecipients}
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    emailRecipients: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateReport}>Generate Report</Button>
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {report.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generated: {report.generatedAt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {report.reportType.replace("_", " ")}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {report.format}
                    </Badge>
                    {report.emailSent && (
                      <Badge className="bg-green-100 text-green-800">
                        Email Sent
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-muted-foreground">Jobs Processed</p>
                  <p className="font-semibold text-foreground">
                    {report.jobsProcessed}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contacts Added</p>
                  <p className="font-semibold text-foreground">
                    {report.contactsAdded}
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
