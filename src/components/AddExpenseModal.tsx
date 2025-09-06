import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Receipt, Users, Calculator } from "lucide-react";
import { User } from "@/data/sampleData";
import { formatCurrency } from "@/data/sampleData";

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  groupMembers: User[];
}

const categories = [
  "Food & Drinks",
  "Transportation", 
  "Accommodation",
  "Entertainment",
  "Groceries",
  "Utilities",
  "Other"
];

const AddExpenseModal = ({ open, onOpenChange, groupId, groupMembers }: AddExpenseModalProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the expense
    console.log({
      description,
      amount: parseFloat(amount),
      category,
      paidBy,
      splitAmong,
      groupId,
    });
    
    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
    setPaidBy("");
    setSplitAmong([]);
    onOpenChange(false);
  };

  const handleMemberToggle = (memberId: string, checked: boolean) => {
    if (checked) {
      setSplitAmong([...splitAmong, memberId]);
    } else {
      setSplitAmong(splitAmong.filter(id => id !== memberId));
    }
  };

  const splitAmount = amount && splitAmong.length > 0 
    ? parseFloat(amount) / splitAmong.length 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 font-heading">
            <Receipt className="h-5 w-5 text-primary" />
            <span>Add New Expense</span>
          </DialogTitle>
          <DialogDescription>
            Split a new expense with your group members
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input
                id="description"
                placeholder="e.g., Dinner at restaurant"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Who Paid */}
          <div className="space-y-2">
            <Label>Who paid? *</Label>
            <Select value={paidBy} onValueChange={setPaidBy} required>
              <SelectTrigger>
                <SelectValue placeholder="Select who paid" />
              </SelectTrigger>
              <SelectContent>
                {groupMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Split Between */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Split between:</Label>
            </div>
            
            <div className="space-y-3">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={member.id}
                    checked={splitAmong.includes(member.id)}
                    onCheckedChange={(checked) => 
                      handleMemberToggle(member.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={member.id} className="flex-1 cursor-pointer">
                    {member.name}
                  </Label>
                  {splitAmong.includes(member.id) && splitAmount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(splitAmount)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {splitAmong.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Select at least one person to split the expense with
              </p>
            )}
          </div>

          {/* Split Summary */}
          {splitAmount > 0 && (
            <>
              <Separator />
              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Calculator className="h-4 w-4" />
                    <span>Split Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total amount:</span>
                    <span className="font-medium">{formatCurrency(parseFloat(amount || "0"))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Split {splitAmong.length} ways:</span>
                    <span className="font-medium">{formatCurrency(splitAmount)} each</span>
                  </div>
                  {paidBy && (
                    <div className="flex justify-between text-primary">
                      <span>{groupMembers.find(m => m.id === paidBy)?.name} gets back:</span>
                      <span className="font-medium">
                        {formatCurrency(parseFloat(amount || "0") - splitAmount)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand"
              className="flex-1"
              disabled={!description || !amount || !paidBy || splitAmong.length === 0}
            >
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;