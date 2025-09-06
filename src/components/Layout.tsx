import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Home, Plus, LogOut } from "lucide-react";
import logo from "@/assets/chaiphaani-logo.png";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
        <div className="container flex h-16 items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="ChaiPaani" className="h-8 w-8" />
            <span className="font-heading text-xl font-bold text-primary">
              ChaiPaani
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              to="/groups"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes("/groups")
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Groups</span>
              </div>
            </Link>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            {/* Add Expense Button */}
            <Button variant="brand" size="sm">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  A
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Arjun</span>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>
    </div>
  );
};

export default Layout;