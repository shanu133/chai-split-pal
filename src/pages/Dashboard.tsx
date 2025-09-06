import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Plus,
  ChevronRight,
  Calendar
} from "lucide-react";
import { 
  sampleGroups, 
  calculateUserBalance, 
  calculateGroupBalances, 
  formatCurrency 
} from "@/data/sampleData";

const Dashboard = () => {
  const currentUserId = "1"; // Arjun Mehta
  const totalBalance = calculateUserBalance(currentUserId);

  // Get group balances for current user
  const groupBalances = sampleGroups.map((group) => {
    const balances = calculateGroupBalances(group.id);
    const userBalance = balances.find((b) => b.userId === currentUserId);
    return {
      ...group,
      balance: userBalance?.amount || 0,
    };
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">
              Welcome back, Arjun! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your financial overview
            </p>
          </div>
          <Button variant="brand" size="lg">
            <Plus className="h-5 w-5" />
            Add Expense
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Balance Card */}
          <Card className="shadow-brand">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalBalance >= 0 ? (
                  <span className="balance-positive flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    {formatCurrency(Math.abs(totalBalance))}
                  </span>
                ) : (
                  <span className="balance-negative flex items-center">
                    <TrendingDown className="mr-2 h-5 w-5" />
                    {formatCurrency(Math.abs(totalBalance))}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalBalance >= 0 
                  ? "You are owed overall" 
                  : "You owe overall"
                }
              </p>
            </CardContent>
          </Card>

          {/* Groups Count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sampleGroups.length}</div>
              <p className="text-xs text-muted-foreground">
                Groups you're part of
              </p>
            </CardContent>
          </Card>

          {/* This Month */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(3450)}</div>
              <p className="text-xs text-muted-foreground">
                Total expenses split
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Groups Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-semibold">Your Groups</h2>
            <Link to="/groups">
              <Button variant="outline">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupBalances.map((group) => (
              <Link key={group.id} to={`/groups/${group.id}`}>
                <Card className="transition-smooth hover:shadow-brand cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge 
                        variant={group.balance >= 0 ? "default" : "secondary"}
                        className={group.balance >= 0 ? "balance-positive" : "balance-negative"}
                      >
                        {group.balance >= 0 ? "+" : ""}{formatCurrency(Math.abs(group.balance))}
                      </Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {group.members.length} members
                      </div>
                      <div className="text-muted-foreground">
                        {group.balance >= 0 ? "You are owed" : "You owe"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>
              Latest expenses and settlements from your groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  description: "Seafood Dinner",
                  group: "Goa Trip 2024",
                  amount: 300,
                  type: "expense",
                  date: "2 hours ago"
                },
                {
                  description: "Electricity Bill",
                  group: "Roommate Expenses", 
                  amount: 1200,
                  type: "owed",
                  date: "1 day ago"
                },
                {
                  description: "Lunch at Cafe Delhi Heights",
                  group: "Office Lunch Squad",
                  amount: 150,
                  type: "expense",
                  date: "2 days ago"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.group} • {activity.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      activity.type === "owed" ? "balance-negative" : "text-foreground"
                    }`}>
                      {activity.type === "owed" ? "You owe " : "Your share: "}
                      {formatCurrency(activity.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;