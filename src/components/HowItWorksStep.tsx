interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const HowItWorksStep = ({ step, title, description, isLast = false }: HowItWorksStepProps) => {
  return (
    <div className="text-center relative">
      <div className="mx-auto w-16 h-16 rounded-full gradient-brand flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-brand">
        {step}
      </div>
      <h3 className="font-heading text-xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute top-8 left-full w-full h-px bg-primary/25" style={{width: 'calc(100% - 2rem)'}} />
      )}
    </div>
  );
};

export default HowItWorksStep;