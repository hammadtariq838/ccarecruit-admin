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
import { Plus, Edit, Trash2, Send } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: string;
  targetCount: number;
  contactsReached: number;
  openRate: number;
  clickRate: number;
  responseRate: number;
  createdAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Tech Leads - Q1 2024",
      status: "running",
      targetCount: 500,
      contactsReached: 342,
      openRate: 45,
      clickRate: 12,
      responseRate: 8,
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "Sales Directors - Pilot",
      status: "completed",
      targetCount: 200,
      contactsReached: 200,
      openRate: 52,
      clickRate: 18,
      responseRate: 11,
      createdAt: "2024-01-05",
    },
  ]);

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    emailTemplate: "",
  });

  const handleCreateCampaign = () => {
    if (newCampaign.name) {
      const campaign: Campaign = {
        id: Date.now().toString(),
        name: newCampaign.name,
        status: "draft",
        targetCount: 0,
        contactsReached: 0,
        openRate: 0,
        clickRate: 0,
        responseRate: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCampaigns([campaign, ...campaigns]);
      setNewCampaign({ name: "", emailTemplate: "" });
      setShowNewCampaign(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Outreach Campaigns
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage email outreach campaigns
          </p>
        </div>
        <Button
          onClick={() => setShowNewCampaign(!showNewCampaign)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* New Campaign Form */}
      {showNewCampaign && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Set up a new outreach campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <Input
                placeholder="e.g., Tech Leads - Q1 2024"
                value={newCampaign.name}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Template</label>
              <Textarea
                placeholder="Hi {First Name},&#10;&#10;I noticed you're a {Job Title} at {Company Name}...&#10;&#10;Best regards"
                value={newCampaign.emailTemplate}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    emailTemplate: e.target.value,
                  })
                }
                className="mt-1 h-32"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use merge fields: {"{First Name}"}, {"{Job Title}"},{" "}
                {"{Company Name}"}, {"{City, State}"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              <Button
                variant="outline"
                onClick={() => setShowNewCampaign(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {campaign.name}
                    </h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created: {campaign.createdAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  {campaign.status === "draft" && (
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Send className="w-4 h-4" />
                      Launch
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-5 gap-4 text-sm p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-semibold text-foreground">
                    {campaign.targetCount}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reached</p>
                  <p className="font-semibold text-foreground">
                    {campaign.contactsReached}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Open Rate</p>
                  <p className="font-semibold text-foreground">
                    {campaign.openRate}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Click Rate</p>
                  <p className="font-semibold text-foreground">
                    {campaign.clickRate}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Response</p>
                  <p className="font-semibold text-foreground">
                    {campaign.responseRate}%
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
