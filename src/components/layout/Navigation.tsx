import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LineChart, label: "Insights", path: "/insights" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border">
      <div className="flex flex-col h-full p-4">
        <div className="mb-8 px-4 pt-4">
          <h1 className="text-xl font-bold">Flux</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
