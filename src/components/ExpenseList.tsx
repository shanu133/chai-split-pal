import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays, IndianRupee, User } from "lucide-react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  groupName?: string;
  yourShare?: number;
}

interface ExpenseListProps {
  groupId?: string;
  expenses?: Expense[];
  loading?: boolean;
}

const ExpenseList = ({ groupId, expenses = [], loading = false }: ExpenseListProps) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Dialog key={expense.id}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-brand transition-all duration-300 border border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="gradient-warm text-white">
                        <IndianRupee className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium truncate">{expense.description}</h3>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <User className="h-3 w-3" />
                        <span>Paid by {expense.paidBy}</span>
                        <span>•</span>
                        <CalendarDays className="h-3 w-3" />
                        <span>{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ₹{expense.amount.toLocaleString()}
                    </div>
                    {expense.yourShare && (
                      <div className="text-sm text-primary">
                        You owe ₹{expense.yourShare.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{expense.description}</DialogTitle>
              <DialogDescription>
                Expense details and split information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                  <p className="text-lg font-semibold">₹{expense.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Your Share</label>
                  <p className="text-lg font-semibold text-primary">
                    ₹{expense.yourShare?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Paid By</label>
                <p className="font-medium">{expense.paidBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <p className="font-medium">{expense.date}</p>
              </div>
              {expense.groupName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Group</label>
                  <Badge variant="secondary" className="mt-1">
                    {expense.groupName}
                  </Badge>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ExpenseList;