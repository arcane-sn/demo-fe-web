import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Search, FileText, User, Building } from "lucide-react";

export default function AccountInquiryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Rocket className="h-8 w-8 text-blue-600" />
          Account Inquiry Statement
        </h1>
        <p className="text-muted-foreground mt-2">
          Search and view account information and statements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Search</CardTitle>
            <CardDescription>
              Search for account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="Enter account name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  placeholder="From"
                />
                <Input
                  type="date"
                  placeholder="To"
                />
              </div>
            </div>

            <Button className="w-full flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Account
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Account details and current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Number</Label>
                    <p className="text-lg font-bold">****1234</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Name</Label>
                    <p className="text-lg">John Doe</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
                    <p className="text-lg">Business</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Active
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Current Balance</Label>
                    <p className="text-2xl font-bold text-green-600">$25,430.50</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Available Balance</Label>
                    <p className="text-lg font-bold">$25,430.50</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Last Transaction</Label>
                    <p className="text-lg">Dec 15, 2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Opened</Label>
                    <p className="text-lg">Jan 15, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Recent account transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Deposit</p>
                      <p className="text-sm text-muted-foreground">Dec 15, 2024 - 2:30 PM</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+$5,000.00</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Withdrawal</p>
                      <p className="text-sm text-muted-foreground">Dec 14, 2024 - 4:15 PM</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">-$2,500.00</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Transfer In</p>
                      <p className="text-sm text-muted-foreground">Dec 13, 2024 - 10:20 AM</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+$1,250.00</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Fee</p>
                      <p className="text-sm text-muted-foreground">Dec 12, 2024 - 9:00 AM</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-600">-$25.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
