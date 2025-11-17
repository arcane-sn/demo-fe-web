import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rocket, Send, User, DollarSign } from "lucide-react";

export function DisbursementContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Funds</CardTitle>
            <CardDescription>
              Create a new disbursement transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="recipient"
                  placeholder="Enter recipient name or email"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Payment description (optional)"
              />
            </div>

            <Button className="w-full flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Funds
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Disbursements</CardTitle>
              <CardDescription>
                Your latest fund transfers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">-$1,250.00</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">ABC Corporation</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">-$5,500.00</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">-$890.50</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Sent Today</span>
                  <span className="font-bold text-red-600">$7,640.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Transactions Today</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="font-bold text-green-600">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Amount</span>
                  <span className="font-bold">$637.04</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
