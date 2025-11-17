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
  Activity,
  Search,
  Filter,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export default function TeamActivitiesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="h-8 w-8 text-blue-600" />
          Team Activities
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor team activities and system events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Activities
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Actions
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,198</div>
            <p className="text-xs text-muted-foreground">96% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Actions
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">49</div>
            <p className="text-xs text-muted-foreground">4% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-10 w-80" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest team activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Smith logged in</p>
                  <p className="text-sm text-muted-foreground">
                    Successfully logged in from Chrome on Windows
                  </p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <Badge
                  variant="success"
                  className="bg-green-100 text-green-800"
                >
                  Login
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    Sarah Johnson created new merchant
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Added "ABC Electronics Store" to merchant list
                  </p>
                  <p className="text-xs text-muted-foreground">
                    15 minutes ago
                  </p>
                </div>
                <Badge variant="primary" className="bg-blue-100 text-blue-800">
                  Create
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mike Chen failed login attempt</p>
                  <p className="text-sm text-muted-foreground">
                    Invalid password entered from Safari on macOS
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-800"
                >
                  Failed
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Emily Davis updated permissions</p>
                  <p className="text-sm text-muted-foreground">
                    Modified user permissions for David Wilson
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge
                  variant="primary"
                  className="bg-purple-100 text-purple-800"
                >
                  Update
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Smith approved settlement</p>
                  <p className="text-sm text-muted-foreground">
                    Approved settlement request #SR-042 for $12,500.00
                  </p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
                <Badge
                  variant="primary"
                  className="bg-green-100 text-green-800"
                >
                  Approve
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">David Wilson account suspended</p>
                  <p className="text-sm text-muted-foreground">
                    Account suspended due to policy violation
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-800"
                >
                  Suspend
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Sarah Johnson exported data</p>
                  <p className="text-sm text-muted-foreground">
                    Exported transaction report for December 2024
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <Badge variant="primary" className="bg-blue-100 text-blue-800">
                  Export
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mike Chen created new role</p>
                  <p className="text-sm text-muted-foreground">
                    Created "Finance Manager" role with custom permissions
                  </p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <Badge
                  variant="primary"
                  className="bg-purple-100 text-purple-800"
                >
                  Create
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity by User</CardTitle>
              <CardDescription>Most active team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">
                        Administrator
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">342 activities</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Manager</p>
                    </div>
                  </div>
                  <span className="font-bold">298 activities</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Mike Chen</p>
                      <p className="text-sm text-muted-foreground">Developer</p>
                    </div>
                  </div>
                  <span className="font-bold">256 activities</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Emily Davis</p>
                      <p className="text-sm text-muted-foreground">Designer</p>
                    </div>
                  </div>
                  <span className="font-bold">189 activities</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Activity breakdown by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Login Activities</span>
                  <span className="font-bold">456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Data Modifications
                  </span>
                  <span className="font-bold">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Permission Changes
                  </span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">System Events</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Export Activities</span>
                  <span className="font-bold">67</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Other Activities</span>
                  <span className="font-bold">245</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
