import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format, addDays } from "date-fns";
import type { Booking } from "@shared/schema";

interface ServiceCalendarProps {
  bookings: Booking[];
}

export function ServiceCalendar({ bookings }: ServiceCalendarProps) {
  // Sort bookings by date
  const upcomingBookings = [...bookings]
    .filter(b => new Date(b.scheduledDate) >= new Date() && b.status !== "canceled")
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "scheduled":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "canceled":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Upcoming Services</CardTitle>
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {upcomingBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">No upcoming services scheduled</p>
            <p className="text-sm text-muted-foreground">
              Our AI will automatically schedule services based on weather and seasonal needs
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-lg border-2 border-border hover-elevate"
                data-testid={`booking-${booking.id}`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Service Scheduled</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(booking.scheduledDate), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(booking.scheduledDate), "h:mm a")}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} border`}>
                    {booking.status}
                  </Badge>
                </div>
                {booking.notes && (
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                    {booking.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
