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
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Trash2, Edit } from "lucide-react";

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  usageCount: number;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Initial Outreach",
      subject: "Opportunity for {Job Title} at {Company Name}",
      body: "Hi {First Name},\n\nI noticed you're a {Job Title} at {Company Name} in {City, State}. I think we have an exciting opportunity that might interest you.\n\nBest regards",
      category: "outreach",
      usageCount: 45,
    },
    {
      id: "2",
      name: "Follow-up",
      subject: "Following up - {Job Title} opportunity",
      body: "Hi {First Name},\n\nJust wanted to follow up on my previous message about the {Job Title} role.\n\nBest regards",
      category: "followup",
      usageCount: 23,
    },
  ]);

  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    body: "",
    category: "outreach",
  });

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.subject && newTemplate.body) {
      const template: Template = {
        id: Date.now().toString(),
        ...newTemplate,
        usageCount: 0,
      };
      setTemplates([template, ...templates]);
      setNewTemplate({ name: "", subject: "", body: "", category: "outreach" });
      setShowNewTemplate(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Email Templates
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage email templates for outreach campaigns
          </p>
        </div>
        <Button
          onClick={() => setShowNewTemplate(!showNewTemplate)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      {/* New Template Form */}
      {showNewTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Template</CardTitle>
            <CardDescription>
              Create an email template with merge fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Template Name</label>
              <Input
                placeholder="e.g., Initial Outreach"
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Subject Line</label>
              <Input
                placeholder="Opportunity for {Job Title} at {Company Name}"
                value={newTemplate.subject}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, subject: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Body</label>
              <Textarea
                placeholder="Hi {First Name},&#10;&#10;I noticed you're a {Job Title} at {Company Name}..."
                value={newTemplate.body}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, body: e.target.value })
                }
                className="mt-1 h-32"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateTemplate}>Create Template</Button>
              <Button
                variant="outline"
                onClick={() => setShowNewTemplate(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates List */}
      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Subject: {template.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Used {template.usageCount} times
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-3 bg-muted rounded-lg text-sm">
                <p className="text-muted-foreground line-clamp-2">
                  {template.body}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
