"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Mail } from "lucide-react";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company: string;
  department: string;
  isVerified: boolean;
  confidenceScore: number;
}

export default function ContactsPage() {
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@techcorp.com",
      title: "Engineering Manager",
      company: "Tech Corp",
      department: "Engineering",
      isVerified: true,
      confidenceScore: 95,
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@startup.com",
      title: "VP Product",
      company: "StartUp Inc",
      department: "Product",
      isVerified: true,
      confidenceScore: 88,
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Chen",
      email: "m.chen@enterprise.com",
      title: "Sales Director",
      company: "Enterprise Co",
      department: "Sales",
      isVerified: false,
      confidenceScore: 72,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2">
            Manage enriched hiring manager contacts
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
            placeholder="Search contacts..."
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

      {/* Contacts table */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.email}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="outline">{contact.title}</Badge>
                    <Badge variant="outline">{contact.company}</Badge>
                    <Badge variant="outline">{contact.department}</Badge>
                    {contact.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline">
                      Score: {contact.confidenceScore}%
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
