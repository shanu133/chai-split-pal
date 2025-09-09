import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
  percentage: number;
}

interface AddExpenseFormProps {
  groupId?: string;
  onSuccess?: () => void;
  participants?: { id: string; name: string }[];
}

const AddExpenseForm = ({ 
  groupId, 
  onSuccess, 
  participants: initialParticipants = [
    { id: "1", name: "You" },
    { id: "2", name: "Priya" },
    { id: "3", name: "Rohit" },
    { id: "4", name: "Kavya" }
  ]
}: AddExpenseFormProps) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [payerId, setPayerId] = useState("1");
  const [splitMethod, setSplitMethod] = useState<'equally' | 'exact' | 'percentage'>('equally');
  const [participants, setParticipants] = useState<Participant[]>(
    initialParticipants.map(p => ({
      ...p,
      checked: true,
      amount: 0,
      percentage: 0
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    description?: string;
    totalAmount?: string;
    participants?: string;
    amounts?: string;
  }>({});

  // Calculate amounts when total amount or split method changes
  useEffect(() => {
    const total = parseFloat(totalAmount) || 0;
    const checkedParticipants = participants.filter(p => p.checked);
    
    if (splitMethod === 'equally' && checkedParticipants.length > 0) {
      const perPersonAmount = total / checkedParticipants.length;
      setParticipants(prev => 
        prev.map(p => ({
          ...p,
          amount: p.checked ? perPersonAmount : 0
        }))
      );
    }
  }, [totalAmount, splitMethod, participants.filter(p => p.checked).length]);

  const handleParticipantToggle = (participantId: string, checked: boolean) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participantId 
          ? { ...p, checked, amount: checked && splitMethod === 'equally' ? 0 : p.amount }
          : p
      )
    );
  };

  const handleAmountChange = (participantId: string, amount: number) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participantId ? { ...p, amount } : p
      )
    );
  };

  const handlePercentageChange = (participantId: string, percentage: number) => {
    const total = parseFloat(totalAmount) || 0;
    const amount = (total * percentage) / 100;
    
    setParticipants(prev => 
      prev.map(p => 
        p.id === participantId ? { ...p, percentage, amount } : p
      )
    );
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const total = parseFloat(totalAmount) || 0;
    const checkedParticipants = participants.filter(p => p.checked);

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!totalAmount || total <= 0) {
      newErrors.totalAmount = "Please enter a valid amount";
    }

    if (checkedParticipants.length === 0) {
      newErrors.participants = "Select at least one participant";
    }

    // Validate amounts sum
    const totalAllocated = checkedParticipants.reduce((sum, p) => sum + p.amount, 0);
    const difference = Math.abs(total - totalAllocated);
    
    if (difference > 0.01) { // Allow for small rounding differences
      newErrors.amounts = `Amounts don't add up. Difference: ₹${difference.toFixed(2)}`;
    }

    // Validate percentages for percentage method
    if (splitMethod === 'percentage') {
      const totalPercentage = checkedParticipants.reduce((sum, p) => sum + p.percentage, 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        newErrors.amounts = `Percentages must add up to 100%. Current total: ${totalPercentage.toFixed(1)}%`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Expense added!",
        description: `₹${parseFloat(totalAmount).toLocaleString()} has been split among ${participants.filter(p => p.checked).length} people.`,
      });
      
      // Reset form
      setDescription("");
      setTotalAmount("");
      setPayerId("1");
      setSplitMethod('equally');
      setParticipants(prev => prev.map(p => ({ ...p, checked: true, amount: 0, percentage: 0 })));
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkedParticipants = participants.filter(p => p.checked);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What was this expense for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && (
            <p className="text-sm text-destructive flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Total Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className={errors.totalAmount ? "border-destructive" : ""}
              step="0.01"
              min="0"
            />
            {errors.totalAmount && (
              <p className="text-sm text-destructive">{errors.totalAmount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payer">Paid by</Label>
            <Select value={payerId} onValueChange={setPayerId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {participants.map((participant) => (
                  <SelectItem key={participant.id} value={participant.id}>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {participant.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Split Method */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Split Method</Label>
          <RadioGroup
            value={splitMethod}
            onValueChange={(value) => setSplitMethod(value as typeof splitMethod)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equally" id="equally" />
              <Label htmlFor="equally">Split equally</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exact" id="exact" />
              <Label htmlFor="exact">Enter exact amounts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage">Split by percentage</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Participants */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Split between</CardTitle>
            {errors.participants && (
              <p className="text-sm text-destructive">{errors.participants}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={participant.checked}
                    onCheckedChange={(checked) => 
                      handleParticipantToggle(participant.id, !!checked)
                    }
                  />
                  <Label className="font-medium">{participant.name}</Label>
                </div>
                
                {participant.checked && (
                  <div className="flex items-center space-x-2">
                    {splitMethod === 'equally' && (
                      <div className="text-right">
                        <div className="font-semibold">
                          ₹{participant.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">per person</div>
                      </div>
                    )}
                    
                    {splitMethod === 'exact' && (
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">₹</span>
                        <Input
                          type="number"
                          className="w-20 h-8"
                          placeholder="0.00"
                          value={participant.amount || ""}
                          onChange={(e) => 
                            handleAmountChange(participant.id, parseFloat(e.target.value) || 0)
                          }
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}
                    
                    {splitMethod === 'percentage' && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          className="w-16 h-8"
                          placeholder="0"
                          value={participant.percentage || ""}
                          onChange={(e) => 
                            handlePercentageChange(participant.id, parseFloat(e.target.value) || 0)
                          }
                          step="0.1"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm">%</span>
                        <div className="text-sm font-medium">
                          (₹{participant.amount.toFixed(2)})
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {errors.amounts && (
              <p className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.amounts}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        {checkedParticipants.length > 0 && (
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total allocated:</span>
                <span className="font-bold">
                  ₹{checkedParticipants.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Participants:</span>
                <span>{checkedParticipants.length} people</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Adding Expense..." : "Add Expense"}
      </Button>
    </form>
  );
};

export default AddExpenseForm;