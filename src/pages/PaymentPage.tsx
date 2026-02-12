import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getBookingById, failBookingPayment } from "@/utils/api";
import { loadRazorpay } from "@/utils/loadRazorpay";
import { config } from "@/lib/config";
import { Booking } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      toast({
        title: "Error",
        description: "No booking ID provided.",
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

    const fetchBooking = async () => {
      try {
        const fetchedBooking = await getBookingById(bookingId);
        if (fetchedBooking.paymentStatus !== 'Pending') {
          toast({
            title: "Booking Not Pending",
            description: "This booking cannot be paid for.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        setBooking(fetchedBooking);
        displayRazorpay(fetchedBooking);
      } catch (err) {
        console.error("Failed to fetch booking", err);
        toast({
          title: "Error",
          description: "Could not retrieve booking details. Please try again.",
          variant: "destructive",
        });
        navigate("/booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate, toast]);

  const displayRazorpay = async (currentBooking: Booking) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast({
        title: "Payment Gateway Error",
        description: "Could not load Razorpay. Please check your connection.",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: config.razorPay.RAZORPAY_KEY_ID,
      amount: (currentBooking.amount * 100).toString(),
      currency: "INR",
      order_id: currentBooking.orderId,
      name: "Someswar Mahadev Temple",
      description: `Pooja Booking for ${currentBooking.poojaType}`,
      prefill: {
        name: currentBooking.devoteeName,
        email: currentBooking.email,
        contact: currentBooking.phone,
      },
      handler: function () {
        toast({
          title: "Payment Successful!",
          description: "Redirecting to your booking confirmation...",
          variant: "default",
        });
        navigate(`/confirmation/${currentBooking.bookingId}`);
      },
      modal: {
        ondismiss: function () {
          failBookingPayment(currentBooking.bookingId);
          toast({
            title: "Payment Cancelled",
            description: "You have cancelled the payment. Please try again if this was a mistake.",
            variant: "destructive",
          });
          navigate("/booking");
        },
      },
      theme: { color: "#ea8000" },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      failBookingPayment(currentBooking.bookingId);
      toast({
        title: "Payment Failed",
        description: response.error.description || "Your payment could not be processed.",
        variant: "destructive",
      });
       navigate(`/confirmation/${currentBooking.bookingId}`);
    });

    rzp.open();
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-theme(spacing.20))] flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto p-6 text-center space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              <span className="animate-pulse">⏳</span> Loading Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-muted-foreground">
              Please wait while we retrieve your booking details and prepare the payment gateway.
            </p>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-theme(spacing.20))] flex items-center justify-center bg-background">
      <Card className="max-w-md mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-xl text-center">Opening Payment Gateway</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6 text-center">
          <p className="text-lg">Please wait, redirecting to Razorpay...</p>
          <p className="text-sm text-muted-foreground">
            Do not close or refresh this page.
          </p>
          <div className="mt-4">
            <svg
              className="animate-spin h-8 w-8 text-primary mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
