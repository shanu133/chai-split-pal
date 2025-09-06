import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Users, 
  IndianRupee, 
  Shield, 
  Smartphone,
  Star
} from "lucide-react";
import logo from "@/assets/chaiphaani-logo.png";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="ChaiPaani" className="h-8 w-8" />
            <span className="font-heading text-xl font-bold text-primary">
              ChaiPaani
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="brand">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="gradient-warm text-white border-0">
                  Split bills, not friendships
                </Badge>
                <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-6xl">
                  Money matters made{" "}
                  <span className="gradient-brand bg-clip-text text-transparent">
                    simple
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  ChaiPaani helps you split expenses with friends, family, and roommates. 
                  Keep track of shared costs effortlessly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="brand" size="lg" className="w-full sm:w-auto">
                    Start Splitting Bills
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">1000+</span> users trust ChaiPaani
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Friends sharing a meal together"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 gradient-hero opacity-20" />
              </div>
              
              {/* Floating Cards */}
              <Card className="absolute -bottom-4 -left-4 w-48 shadow-brand">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Goa Trip</p>
                      <p className="text-xs text-muted-foreground">4 members</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold balance-positive">+₹2,400</p>
                      <p className="text-xs text-muted-foreground">You are owed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -top-4 -right-4 w-44 shadow-warm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dinner Split</p>
                      <p className="text-xs text-muted-foreground">₹1,200 total</p>
                    </div>
                    <div className="text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl font-bold">
              Why choose ChaiPaani?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for Indian users who value relationships as much as accurate calculations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center shadow-soft">
              <CardHeader>
                <div className="mx-auto gradient-brand w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Indian Currency Native</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built specifically for Indian Rupees with local payment methods and UPI integration
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft">
              <CardHeader>
                <div className="mx-auto gradient-warm w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Group Harmony</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep friendships intact while managing group expenses transparently and fairly
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft">
              <CardHeader>
                <div className="mx-auto gradient-success w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Simple & Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add expenses in seconds. Real-time calculations keep everyone updated instantly
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl font-bold">
              Loved by groups across India
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                text: "ChaiPaani saved our Goa trip from becoming a nightmare of calculations!",
                author: "Priya S.",
                location: "Mumbai",
                rating: 5
              },
              {
                text: "Finally, an app that gets how Indian friends handle money. Love it!",
                author: "Arjun M.",
                location: "Delhi",
                rating: 5
              },
              {
                text: "Our flat expenses are so organized now. No more awkward conversations.",
                author: "Kavya N.",
                location: "Bangalore",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="font-medium">
                    {testimonial.author}
                    <span className="text-muted-foreground text-sm ml-2">
                      {testimonial.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold">
              Ready to simplify your group expenses?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of Indians who've made money conversations easier with ChaiPaani
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={logo} alt="ChaiPaani" className="h-6 w-6" />
              <span className="font-heading text-lg font-bold text-primary">
                ChaiPaani
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 ChaiPaani. Split bills, not friendships.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
