import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import AddExpenseModal from "@/components/AddExpenseModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  IndianRupee, 
  Plus, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt
} from "lucide-react";
import { 
  sampleGroups, 
  sampleUsers,
  calculateGroupBalances, 
  getGroupExpenses, 
  formatCurrency 
} from "@/data/sampleData";

const GroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const currentUserId = "1"; // Arjun Mehta

  const group = sampleGroups.find((g) => g.id === groupId);
  const expenses = getGroupExpenses(groupId || "");
  const balances = calculateGroupBalances(groupId || "");
  
  if (!group) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Group not found</h1>
          <p className="text-muted-foreground">The group you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const getUserById = (id: string) => sampleUsers.find(u => u.id === id);
  const currentUserBalance = balances.find(b => b.userId === currentUserId);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Group Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="font-heading text-3xl font-bold">{group.name}</h1>
            <p className="text-muted-foreground">{group.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {group.members.length} members
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Created {new Date(group.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <Button 
            variant="brand" 
            size="lg"
            onClick={() => setShowAddExpense(true)}
          >
            <Plus className="h-5 w-5" />
            Add Expense
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Balances */}
          <div className="lg:col-span-1 space-y-4">
            {/* Your Balance */}
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="text-lg">Your Balance</CardTitle>
              </CardHeader>
              <CardContent>
                {currentUserBalance ? (
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold">
                      {currentUserBalance.amount >= 0 ? (
                        <span className="balance-positive flex items-center justify-center">
                          <ArrowUpRight className="mr-2 h-6 w-6" />
                          {formatCurrency(Math.abs(currentUserBalance.amount))}
                        </span>
                      ) : (
                        <span className="balance-negative flex items-center justify-center">
                          <ArrowDownLeft className="mr-2 h-6 w-6" />
                          {formatCurrency(Math.abs(currentUserBalance.amount))}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentUserBalance.amount >= 0 
                        ? "You are owed in this group" 
                        : "You owe in this group"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-2xl font-bold balance-neutral">
                      {formatCurrency(0)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You're all settled up!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Group Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Group Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.members.map((member) => {
                  const balance = balances.find(b => b.userId === member.id);
                  return (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{member.name}</span>
                      </div>
                      {balance && balance.amount !== 0 && (
                        <Badge 
                          variant={balance.amount >= 0 ? "default" : "secondary"}
                          className={`text-xs ${balance.amount >= 0 ? "balance-positive" : "balance-negative"}`}
                        >
                          {balance.amount >= 0 ? "+" : ""}{formatCurrency(Math.abs(balance.amount))}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Balance Summary */}
            {balances.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Balance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {balances.map((balance) => (
                    <div key={balance.userId} className="flex items-center justify-between text-sm">
                      <span>{balance.userName}</span>
                      <span className={balance.amount >= 0 ? "balance-positive" : "balance-negative"}>
                        {balance.amount >= 0 ? "gets back " : "owes "}
                        {formatCurrency(Math.abs(balance.amount))}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Expenses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Group Expenses</CardTitle>
                    <CardDescription>
                      All expenses in this group
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    <Receipt className="mr-1 h-3 w-3" />
                    {expenses.length} expenses
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No expenses yet</h3>
                    <p className="text-muted-foreground">
                      Add your first expense to get started
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="brand"
                      onClick={() => setShowAddExpense(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {expenses.map((expense, index) => {
                      const paidBy = getUserById(expense.paidBy);
                      const splitAmount = expense.amount / expense.splitAmong.length;
                      const isCurrentUserInvolved = expense.splitAmong.includes(currentUserId);
                      
                      return (
                        <div key={expense.id}>
                          <div className="flex items-start justify-between py-3">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{expense.description}</h4>
                                {expense.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {expense.category}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Paid by {paidBy?.name}</span>
                                <span>•</span>
                                <span>{new Date(expense.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Split {expense.splitAmong.length} ways</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                {formatCurrency(expense.amount)}
                              </div>
                              {isCurrentUserInvolved && (
                                <div className="text-sm text-muted-foreground">
                                  Your share: {formatCurrency(splitAmount)}
                                </div>
                              )}
                            </div>
                          </div>
                          {index < expenses.length - 1 && <Separator />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddExpenseModal 
        open={showAddExpense} 
        onOpenChange={setShowAddExpense}
        groupId={groupId || ""}
        groupMembers={group.members}
      />
    </Layout>
  );
};

export default GroupDetail;