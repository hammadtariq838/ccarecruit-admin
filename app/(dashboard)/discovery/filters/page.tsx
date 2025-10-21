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
import { Plus, Trash2, Edit } from "lucide-react";

interface Filter {
  id: string;
  name: string;
  industries: string[];
  countries: string[];
  excludeKeywords: string[];
  isActive: boolean;
}

export default function FiltersPage() {
  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "1",
      name: "Tech Jobs - US",
      industries: ["Technology", "Software"],
      countries: ["US"],
      excludeKeywords: ["Intern", "Junior"],
      isActive: true,
    },
    {
      id: "2",
      name: "Sales - Remote",
      industries: ["Sales"],
      countries: ["US", "Canada"],
      excludeKeywords: ["Entry Level"],
      isActive: true,
    },
  ]);

  const [showNewFilter, setShowNewFilter] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Filters</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage job discovery filters
          </p>
        </div>
        <Button
          onClick={() => setShowNewFilter(!showNewFilter)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Filter
        </Button>
      </div>

      {/* New Filter Form */}
      {showNewFilter && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Filter</CardTitle>
            <CardDescription>Define criteria for job discovery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Filter Name</label>
              <Input placeholder="e.g., Tech Jobs - US" className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium">Industries</label>
              <Input
                placeholder="Technology, Software, Finance..."
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Countries</label>
              <Input placeholder="US, Canada, UK..." className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium">Exclude Keywords</label>
              <Input
                placeholder="Intern, Junior, Entry Level..."
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button>Create Filter</Button>
              <Button variant="outline" onClick={() => setShowNewFilter(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters List */}
      <div className="space-y-4">
        {filters.map((filter) => (
          <Card key={filter.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {filter.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {filter.industries.map((ind) => (
                      <Badge key={ind} variant="secondary">
                        {ind}
                      </Badge>
                    ))}
                    {filter.countries.map((country) => (
                      <Badge key={country} variant="outline">
                        {country}
                      </Badge>
                    ))}
                  </div>
                  {filter.excludeKeywords.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">
                        Exclude: {filter.excludeKeywords.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
