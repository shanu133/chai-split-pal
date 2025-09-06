import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Chrome } from "lucide-react";
import logo from "@/assets/chaiphaani-logo.png";
import heroImage from "@/assets/hero-image.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <img src={logo} alt="ChaiPaani" className="h-12 w-12" />
            <h1 className="font-heading text-2xl font-bold text-primary">
              Welcome back to ChaiPaani
            </h1>
            <p className="text-muted-foreground">
              Split bills, not friendships
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-brand">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-heading">Sign in</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="arjun@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" variant="brand" size="lg">
                  Sign In
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <img
          src={heroImage}
          alt="Friends sharing a meal"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium">
              "ChaiPaani made splitting our group expenses so much easier. No more awkward conversations about money!"
            </p>
            <footer className="text-sm opacity-80">Priya Sharma, Mumbai</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;