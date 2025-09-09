import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'total' | 'owed' | 'owing';
  className?: string;
}

const SummaryCard = ({ title, amount, type, className }: SummaryCardProps) => {
  const getAmountColor = () => {
    if (type === 'total') {
      return amount >= 0 ? 'text-success' : 'text-primary';
    }
    return type === 'owed' ? 'text-success' : 'text-primary';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <Card className={cn("shadow-soft hover:shadow-brand transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold font-heading", getAmountColor())}>
          {formatAmount(amount)}
        </div>
        {type === 'total' && amount < 0 && (
          <p className="text-xs text-muted-foreground mt-1">you owe overall</p>
        )}
        {type === 'total' && amount > 0 && (
          <p className="text-xs text-muted-foreground mt-1">you are owed overall</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;