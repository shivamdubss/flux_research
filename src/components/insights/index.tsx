import React from "react";
import { Card } from "@/components/ui/card";

const Insights = () => {
  return (
    <div className="w-full min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Insights</h1>
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Coming Soon
          </h2>
          <p className="text-muted-foreground mt-2">
            Analytics and research insights will be available here
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
