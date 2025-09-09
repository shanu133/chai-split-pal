import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="text-center shadow-soft hover:shadow-brand transition-all duration-300 border border-border/50 bg-card hover:scale-105 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <CardHeader>
        <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4 transition-colors">
          <div className="text-secondary">
            {icon}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;