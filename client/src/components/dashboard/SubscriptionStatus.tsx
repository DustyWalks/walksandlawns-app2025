import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Snowflake, Leaf, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

interface SubscriptionStatusProps {
  user: User;
}

export function SubscriptionStatus({ user }: SubscriptionStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    if (!user.stripeCustomerId) {
      toast({
        title: "No Subscription",
        description: "You don't have an active subscription yet.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/create-customer-portal-session", {});
      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  const currentMonth = new Date().getMonth();
  const currentSeason = currentMonth >= 11 || currentMonth <= 2 ? "winter" : 
                       currentMonth >= 3 && currentMonth <= 5 ? "spring" :
                       currentMonth >= 6 && currentMonth <= 8 ? "summer" : "fall";

  const seasonConfig = {
    winter: {
      icon: Snowflake,
      title: "Winter Services Active",
      description: "Snow removal and walkway clearing",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    spring: {
      icon: CalendarIcon,
      title: "Spring Cleanup Active",
      description: "Yard preparation and cleanup",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    summer: {
      icon: Leaf,
      title: "Summer Services Active",
      description: "Weekly lawn mowing and maintenance",
      color: "text-green-600",
      bgColor: "bg-green-600/10",
    },
    fall: {
      icon: CalendarIcon,
      title: "Fall Cleanup Active",
      description: "Leaf removal and winter prep",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  };

  const config = seasonConfig[currentSeason];
  const Icon = config.icon;

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Subscription Status</CardTitle>
        <Badge variant={user.subscriptionStatus === "active" ? "default" : "secondary"}>
          {user.subscriptionStatus || "Active"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Season Service */}
        <div className={`p-6 rounded-lg ${config.bgColor} border-2 border-primary/20`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 ${config.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{config.title}</h3>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Monthly Rate</span>
            <span className="font-bold text-lg">$188/month</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Next Billing</span>
            <span className="font-semibold">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-muted-foreground">Member Since</span>
            <span className="font-semibold">
              {new Date(user.createdAt!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Included Services */}
        <div>
          <h4 className="font-semibold mb-3">Included Services</h4>
          <div className="space-y-2">
            {["Unlimited Snow Removal", "Weekly Lawn Mowing", "Spring Cleanup", "Fall Cleanup"].map((service, index) => (
              <div key={index} className="flex items-center gap-2 text-sm" data-testid={`included-service-${index}`}>
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Button */}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleManageSubscription}
          disabled={isLoading}
          data-testid="button-manage-subscription"
        >
          {isLoading ? "Opening..." : "Manage Subscription"}
        </Button>
      </CardContent>
    </Card>
  );
}
