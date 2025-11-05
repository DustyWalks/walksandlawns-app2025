import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SubscriptionStatus } from "@/components/dashboard/SubscriptionStatus";
import { ServiceCalendar } from "@/components/dashboard/ServiceCalendar";
import { ServiceHistory } from "@/components/dashboard/ServiceHistory";
import { AddOnsManager } from "@/components/dashboard/AddOnsManager";
import { ChatWidget } from "@/components/ChatWidget";
import { LogOut, Menu } from "lucide-react";
import type { Booking, AddOn, UserAddOn } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const { data: availableAddOns = [] } = useQuery<AddOn[]>({
    queryKey: ["/api/addons"],
    enabled: isAuthenticated,
  });

  const { data: userAddOns = [] } = useQuery<UserAddOn[]>({
    queryKey: ["/api/user-addons"],
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-foreground">Walks & Lawns</h1>
              <span className="text-sm text-muted-foreground hidden sm:inline">Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                {user.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-border"
                  />
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.firstName || "there"}!
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's your property maintenance overview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {/* Left Column - Subscription Status */}
          <div className="lg:col-span-1">
            <SubscriptionStatus user={user} />
          </div>

          {/* Right Column - Calendar and History */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <ServiceCalendar bookings={bookings} />
            <ServiceHistory bookings={bookings} />
          </div>
        </div>

        {/* Add-ons Section */}
        <AddOnsManager availableAddOns={availableAddOns} userAddOns={userAddOns} />
      </main>

      <ChatWidget />
    </div>
  );
}
