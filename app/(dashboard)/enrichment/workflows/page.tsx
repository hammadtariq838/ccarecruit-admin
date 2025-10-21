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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Edit, Play } from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  enrichmentType: string;
  enableTitleMapping: boolean;
  enableContactEnrichment: boolean;
  enableEmbeddings: boolean;
  isActive: boolean;
  isDefault: boolean;
  jobsProcessed: number;
  contactsFound: number;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "Standard Enrichment",
      enrichmentType: "hybrid",
      enableTitleMapping: true,
      enableContactEnrichment: true,
      enableEmbeddings: false,
      isActive: true,
      isDefault: true,
      jobsProcessed: 2847,
      contactsFound: 1243,
    },
    {
      id: "2",
      name: "Advanced with Embeddings",
      enrichmentType: "hybrid",
      enableTitleMapping: true,
      enableContactEnrichment: true,
      enableEmbeddings: true,
      isActive: true,
      isDefault: false,
      jobsProcessed: 1200,
      contactsFound: 890,
    },
  ]);

  const [showNewWorkflow, setShowNewWorkflow] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    enrichmentType: "hybrid",
    enableTitleMapping: true,
    enableContactEnrichment: true,
    enableEmbeddings: false,
  });

  const handleCreateWorkflow = () => {
    if (newWorkflow.name) {
      const workflow: Workflow = {
        id: Date.now().toString(),
        ...newWorkflow,
        isActive: true,
        isDefault: false,
        jobsProcessed: 0,
        contactsFound: 0,
      };
      setWorkflows([workflow, ...workflows]);
      setNewWorkflow({
        name: "",
        enrichmentType: "hybrid",
        enableTitleMapping: true,
        enableContactEnrichment: true,
        enableEmbeddings: false,
      });
      setShowNewWorkflow(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Enrichment Workflows
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage job enrichment and contact discovery workflows
          </p>
        </div>
        <Button
          onClick={() => setShowNewWorkflow(!showNewWorkflow)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </Button>
      </div>

      {/* New Workflow Form */}
      {showNewWorkflow && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Workflow</CardTitle>
            <CardDescription>
              Configure enrichment settings for job processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Workflow Name</label>
              <Input
                placeholder="e.g., Standard Enrichment"
                value={newWorkflow.name}
                onChange={(e) =>
                  setNewWorkflow({ ...newWorkflow, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Enrichment Type</label>
              <div className="flex gap-4 mt-2">
                {["apollo", "openai", "hybrid"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="enrichmentType"
                      value={type}
                      checked={newWorkflow.enrichmentType === type}
                      onChange={(e) =>
                        setNewWorkflow({
                          ...newWorkflow,
                          enrichmentType: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Enrichment Options</label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={newWorkflow.enableTitleMapping}
                  onCheckedChange={(checked) =>
                    setNewWorkflow({
                      ...newWorkflow,
                      enableTitleMapping: checked as boolean,
                    })
                  }
                />
                <label className="text-sm cursor-pointer">
                  Enable Job Title Mapping
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={newWorkflow.enableContactEnrichment}
                  onCheckedChange={(checked) =>
                    setNewWorkflow({
                      ...newWorkflow,
                      enableContactEnrichment: checked as boolean,
                    })
                  }
                />
                <label className="text-sm cursor-pointer">
                  Enable Contact Enrichment (Apollo.io)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={newWorkflow.enableEmbeddings}
                  onCheckedChange={(checked) =>
                    setNewWorkflow({
                      ...newWorkflow,
                      enableEmbeddings: checked as boolean,
                    })
                  }
                />
                <label className="text-sm cursor-pointer">
                  Enable Embeddings (OpenAI)
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateWorkflow}>Create Workflow</Button>
              <Button
                variant="outline"
                onClick={() => setShowNewWorkflow(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {workflow.name}
                    </h3>
                    {workflow.isDefault && <Badge>Default</Badge>}
                    {workflow.isActive && (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Type: {workflow.enrichmentType}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Play className="w-4 h-4" />
                    Run
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Workflow settings */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Checkbox checked={workflow.enableTitleMapping} disabled />
                  <span className="text-sm">Title Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={workflow.enableContactEnrichment}
                    disabled
                  />
                  <span className="text-sm">Contact Enrichment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={workflow.enableEmbeddings} disabled />
                  <span className="text-sm">Embeddings</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Jobs Processed</p>
                  <p className="font-semibold text-foreground">
                    {workflow.jobsProcessed}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contacts Found</p>
                  <p className="font-semibold text-foreground">
                    {workflow.contactsFound}
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
