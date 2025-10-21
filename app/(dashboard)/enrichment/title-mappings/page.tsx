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
import { Plus, Trash2, Upload } from "lucide-react";

interface TitleMapping {
  id: string;
  originalTitle: string;
  standardizedTitle: string;
  category: string;
  usageCount: number;
}

export default function TitleMappingsPage() {
  const [mappings, setMappings] = useState<TitleMapping[]>([
    {
      id: "1",
      originalTitle: "Sr. Software Engineer",
      standardizedTitle: "Senior Software Engineer",
      category: "Engineering",
      usageCount: 145,
    },
    {
      id: "2",
      originalTitle: "Product Mgr",
      standardizedTitle: "Product Manager",
      category: "Product",
      usageCount: 89,
    },
    {
      id: "3",
      originalTitle: "Sales Rep",
      standardizedTitle: "Sales Representative",
      category: "Sales",
      usageCount: 234,
    },
  ]);

  const [showNewMapping, setShowNewMapping] = useState(false);
  const [newMapping, setNewMapping] = useState({
    originalTitle: "",
    standardizedTitle: "",
    category: "",
  });

  const handleCreateMapping = () => {
    if (newMapping.originalTitle && newMapping.standardizedTitle) {
      const mapping: TitleMapping = {
        id: Date.now().toString(),
        ...newMapping,
        usageCount: 0,
      };
      setMappings([mapping, ...mappings]);
      setNewMapping({ originalTitle: "", standardizedTitle: "", category: "" });
      setShowNewMapping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Job Title Mappings
          </h1>
          <p className="text-muted-foreground mt-2">
            Standardize job titles for consistent enrichment
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>
          <Button
            onClick={() => setShowNewMapping(!showNewMapping)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Mapping
          </Button>
        </div>
      </div>

      {/* New Mapping Form */}
      {showNewMapping && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Title Mapping</CardTitle>
            <CardDescription>
              Map original titles to standardized titles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Original Title</label>
              <Input
                placeholder="e.g., Sr. Software Engineer"
                value={newMapping.originalTitle}
                onChange={(e) =>
                  setNewMapping({
                    ...newMapping,
                    originalTitle: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Standardized Title</label>
              <Input
                placeholder="e.g., Senior Software Engineer"
                value={newMapping.standardizedTitle}
                onChange={(e) =>
                  setNewMapping({
                    ...newMapping,
                    standardizedTitle: e.target.value,
                  })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                placeholder="e.g., Engineering"
                value={newMapping.category}
                onChange={(e) =>
                  setNewMapping({ ...newMapping, category: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateMapping}>Create Mapping</Button>
              <Button
                variant="outline"
                onClick={() => setShowNewMapping(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mappings Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {mappings.map((mapping) => (
              <div
                key={mapping.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <p className="font-medium text-foreground">
                        {mapping.originalTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        → {mapping.standardizedTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{mapping.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Used {mapping.usageCount} times
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
