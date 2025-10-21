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
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";

import ChangePasswordForm from "./change-password";

interface ApiCredential {
  id: string;
  provider: string;
  name: string;
  isActive: boolean;
  lastUsed: string;
}

export default function SettingsPage() {
  const [credentials, setCredentials] = useState<ApiCredential[]>([
    {
      id: "1",
      provider: "apollo",
      name: "Apollo.io Production",
      isActive: true,
      lastUsed: "2024-01-15 14:30",
    },
    {
      id: "2",
      provider: "openai",
      name: "OpenAI API Key",
      isActive: true,
      lastUsed: "2024-01-15 12:15",
    },
    {
      id: "3",
      provider: "apify",
      name: "Apify Token",
      isActive: true,
      lastUsed: "2024-01-15 10:45",
    },
  ]);

  const [showNewCredential, setShowNewCredential] = useState(false);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newCredential, setNewCredential] = useState({
    provider: "apollo",
    name: "",
    key: "",
  });

  const handleAddCredential = () => {
    if (newCredential.name && newCredential.key) {
      const credential: ApiCredential = {
        id: Date.now().toString(),
        provider: newCredential.provider,
        name: newCredential.name,
        isActive: true,
        lastUsed: new Date().toLocaleString(),
      };
      setCredentials([credential, ...credentials]);
      setNewCredential({ provider: "apollo", name: "", key: "" });
      setShowNewCredential(false);
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "apollo":
        return "bg-blue-100 text-blue-800";
      case "openai":
        return "bg-green-100 text-green-800";
      case "apify":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage API credentials and account settings
        </p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Change Password</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChangePasswordForm />
        </CardContent>
      </Card>

      {/* API Credentials */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Credentials</CardTitle>
              <CardDescription>
                Manage your API keys for integrations
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowNewCredential(!showNewCredential)}
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Credential
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* New Credential Form */}
          {showNewCredential && (
            <div className="p-4 border rounded-lg bg-muted space-y-4">
              <div>
                <label className="text-sm font-medium">Provider</label>
                <select
                  value={newCredential.provider}
                  onChange={(e) =>
                    setNewCredential({
                      ...newCredential,
                      provider: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="apollo">Apollo.io</option>
                  <option value="openai">OpenAI</option>
                  <option value="apify">Apify</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Credential Name</label>
                <Input
                  placeholder="e.g., Apollo Production"
                  value={newCredential.name}
                  onChange={(e) =>
                    setNewCredential({ ...newCredential, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">API Key</label>
                <Input
                  type="password"
                  placeholder="Paste your API key here"
                  value={newCredential.key}
                  onChange={(e) =>
                    setNewCredential({ ...newCredential, key: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddCredential} size="sm">
                  Add Credential
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewCredential(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Credentials List */}
          <div className="space-y-3">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      className={getProviderColor(cred.provider)}
                      variant="outline"
                    >
                      {cred.provider.toUpperCase()}
                    </Badge>
                    <h4 className="font-medium text-foreground">{cred.name}</h4>
                    {cred.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last used: {cred.lastUsed}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    {showKey === cred.id ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye
                        className="w-4 h-4"
                        onClick={() => setShowKey(cred.id)}
                      />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Settings</CardTitle>
          <CardDescription>
            Configure automatic sync and processing parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Auto-sync Jobs</p>
              <p className="text-sm text-muted-foreground">
                Automatically sync new jobs from sources
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">
                Auto-enrich Contacts
              </p>
              <p className="text-sm text-muted-foreground">
                Automatically enrich jobs with contact data
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Daily Reports</p>
              <p className="text-sm text-muted-foreground">
                Send daily summary reports via email
              </p>
            </div>
            <Checkbox />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Duplicate Detection</p>
              <p className="text-sm text-muted-foreground">
                Automatically detect and remove duplicates
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how you receive alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">
                Task Completion Alerts
              </p>
              <p className="text-sm text-muted-foreground">
                Notify when scraping tasks complete
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">API Error Alerts</p>
              <p className="text-sm text-muted-foreground">
                Notify on API integration failures
              </p>
            </div>
            <Checkbox defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-foreground">
                Queue Depth Warnings
              </p>
              <p className="text-sm text-muted-foreground">
                Alert when queue depth exceeds threshold
              </p>
            </div>
            <Checkbox />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Clear All Data
          </Button>
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
