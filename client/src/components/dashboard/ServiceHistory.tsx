import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Booking } from "@shared/schema";

interface ServiceHistoryProps {
  bookings: Booking[];
}

export function ServiceHistory({ bookings }: ServiceHistoryProps) {
  const completedBookings = [...bookings]
    .filter(b => b.status === "completed")
    .sort((a, b) => new Date(b.completedAt || b.scheduledDate).getTime() - new Date(a.completedAt || a.scheduledDate).getTime())
    .slice(0, 10);

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Service History</CardTitle>
      </CardHeader>
      <CardContent>
        {completedBookings.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No service history yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your completed services will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover-elevate"
                data-testid={`history-${booking.id}`}
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold">Service Completed</h4>
                    <Badge variant="secondary" className="flex-shrink-0">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(booking.completedAt || booking.scheduledDate), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                  {booking.notes && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {booking.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
