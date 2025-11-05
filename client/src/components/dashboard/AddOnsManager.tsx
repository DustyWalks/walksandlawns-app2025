import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AddOn, UserAddOn } from "@shared/schema";

interface AddOnsManagerProps {
  availableAddOns: AddOn[];
  userAddOns: UserAddOn[];
}

export function AddOnsManager({ availableAddOns, userAddOns }: AddOnsManagerProps) {
  const { toast } = useToast();

  const addAddOnMutation = useMutation({
    mutationFn: async (addOnId: string) => {
      return await apiRequest("POST", "/api/user-addons", { addOnId, isActive: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-addons"] });
      toast({
        title: "Add-on Activated",
        description: "Your new service has been added to your subscription",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add service. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeAddOnMutation = useMutation({
    mutationFn: async (userAddOnId: string) => {
      return await apiRequest("DELETE", `/api/user-addons/${userAddOnId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-addons"] });
      toast({
        title: "Add-on Removed",
        description: "The service has been removed from your subscription",
      });
    },
  });

  const isAddOnActive = (addOnId: string) => {
    return userAddOns.some(ua => ua.addOnId === addOnId && ua.isActive);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Manage Add-Ons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableAddOns.map((addon) => {
            const active = isAddOnActive(addon.id);
            const userAddOn = userAddOns.find(ua => ua.addOnId === addon.id && ua.isActive);

            return (
              <div
                key={addon.id}
                className={`p-6 rounded-lg border-2 ${
                  active ? "border-primary bg-primary/5" : "border-border"
                }`}
                data-testid={`addon-card-${addon.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-lg">{addon.name}</h4>
                  {active && (
                    <Badge variant="default" className="flex-shrink-0">
                      Active
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {addon.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    {addon.priceMonthly ? (
                      <>
                        ${addon.priceMonthly}
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </>
                    ) : (
                      <>
                        ${addon.priceOneTime}
                        <span className="text-sm text-muted-foreground"> one-time</span>
                      </>
                    )}
                  </div>

                  {active ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => userAddOn && removeAddOnMutation.mutate(userAddOn.id)}
                      disabled={removeAddOnMutation.isPending}
                      data-testid={`button-remove-addon-${addon.id}`}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => addAddOnMutation.mutate(addon.id)}
                      disabled={addAddOnMutation.isPending}
                      data-testid={`button-add-addon-${addon.id}`}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
