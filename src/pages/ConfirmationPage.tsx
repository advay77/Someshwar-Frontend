import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { CheckCircle, Calendar, User, Mail, Phone, MapPin, Download, Home, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookingById } from "@/utils/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/components/ui/use-toast";
import { config } from "@/lib/config";

interface ConfirmationData {
  bookingId: string;
  devoteName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  poojaName: string;
  poojaDate: string;
  poojaMode: string;
  poojaTemple: string;
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentMethod: string;
  gotra?: string;
  specialRequirements?: string;
}

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  
  // Reference for the hidden PDF template
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getBookingById(params.bookingId);
        // Mapping API response to our interface
        const b = res;
        const confirmationData: ConfirmationData = {
          bookingId: b.bookingId,
          devoteName: b.devoteeName,
          email: b.email,
          phone: b.phone,
          address: b.homeAddress,
          city: b.city,
          pincode: b.pincode,
          poojaName: b.poojaType,
          poojaDate: b.poojaDate,
          poojaMode: b.poojaMode,
          poojaTemple: b.poojaTemple,
          amount: b.amount,
          paymentStatus: b.paymentStatus,
          paymentMethod: b.paymentMethod, // Assuming this comes from backend or derived
          gotra: b.gotra,
          specialRequirements: b.specialRequirements
        };

        setData(confirmationData);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast({
          title:"Error",
          description:"Unable to fetch booking details. Redirecting to home.",
          variant:"destructive"
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (params.bookingId) fetchData();
  }, [params.bookingId, navigate, toast]);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Improves PDF resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190; // A4 width minus margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Someswar_Receipt_${data?.bookingId}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!data || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Loading booking details...</p>
      </div>
    );
  }

  const isBookingCompleted = data.paymentStatus === "Completed";

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Conditional Header based on payment status */}
          <div className="text-center mb-10">
            {isBookingCompleted ? (
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {isBookingCompleted ? "Booking Confirmed! 🙏" : "Booking Status: " + data.paymentStatus}
            </h1>
            <p className="text-muted-foreground">
              {isBookingCompleted ? "Thank you for booking with Someswar Mahadev Temple" : "There was an issue with your booking or payment."}
            </p>
          </div>

          {isBookingCompleted ? (
            <>
              {/* Booking Details Card */}
              <Card className="mb-8 overflow-hidden animate-slide-up">
                <CardHeader className="bg-gradient-sacred text-primary-foreground">
                  <CardTitle className="flex items-center justify-between">
                    <span>Booking Details</span>
                    <span className="text-sm font-mono opacity-90">#{data.bookingId}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pooja Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <span className="text-2xl">🕉️</span>
                        Pooja Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pooja:</span>
                          <span className="font-medium">{data.poojaName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(data.poojaDate).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mode:</span>
                          <span className="font-medium capitalize">{data.poojaMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Temple:</span>
                          <span className="font-medium">{data.poojaTemple}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount Paid:</span>
                          <span className="font-bold text-primary">
                            ₹{data.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Status:</span>
                          <span className="text-green-600 font-medium capitalize">
                            ✓ {data.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Devotee Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Devotee Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{data.devoteName}</span>
                          {data.gotra && (
                            <span className="text-muted-foreground">({data.gotra} Gotra)</span>
                          )}
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{data.email}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{data.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{data.address}, {data.city} - {data.pincode}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {data.specialRequirements && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Special Requirements:</h4>
                      <p className="text-sm text-muted-foreground">{data.specialRequirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* What's Next */}
              <Card className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="text-xl">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Confirmation Email Sent</h4>
                        <p className="text-sm text-muted-foreground">
                          Check your email for booking confirmation and details.
                        </p>
                      </div>
                    </div>
                    {data.poojaMode === "online" ? (
                      <>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium">Pooja Recording</h4>
                            <p className="text-sm text-muted-foreground">
                              You will receive a recording of the pooja via WhatsApp/Email within 24 hours.
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium">Temple Arrival</h4>
                            <p className="text-sm text-muted-foreground">
                              Please arrive at the temple 30-45 minutes before the scheduled pooja time at {data.poojaTemple}.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium">Receipt Required</h4>
                            <p className="text-sm text-muted-foreground">
                              Kindly bring a printout or digital copy of this receipt for verification.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                    {/* <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Prasad Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          Sacred prasad will be delivered to your address within 5-7 days.
                        </p>
                      </div>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "200ms" }}>
                <Button 
                  onClick={handleDownload} 
                  disabled={isDownloading}
                  variant="outline" 
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isDownloading ? "Generating Receipt..." : "Download Receipt"}
                </Button>
                <Link to="/">
                  <Button variant="sacred" className="gap-2 w-full sm:w-auto">
                    <Home className="h-4 w-4" />
                    Return Home
                  </Button>
                </Link>
              </div>

              {/* Contact */}
              <div className="mt-12 text-center text-sm text-muted-foreground">
                <p>Questions? Contact us at:</p>
                <p className="font-medium text-foreground">
                  +91 {config.contact.phone} | {config.contact.email}
                </p>
              </div>

              {/* --- HIDDEN PROFESSIONAL PDF TEMPLATE --- */}
              <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
                <div ref={receiptRef} style={{ width: "794px", padding: "40px", backgroundColor: "white", color: "black", fontFamily: "serif" }}>
                  <div style={{ border: "4px double #ea580c", padding: "30px", position: "relative" }}>
                    
                    {/* PDF Header */}
                    <div style={{ textAlign: "center", borderBottom: "2px solid #fed7aa", paddingBottom: "20px", marginBottom: "30px" }}>
                      <h1 style={{ fontSize: "28px", color: "#9a3412", margin: "0", textTransform: "uppercase", letterSpacing: "2px" }}>Someswar Mahadev Temple</h1>
                      <p style={{ margin: "5px 0", fontSize: "14px", fontStyle: "italic" }}>Official Pooja Booking Receipt</p>
                      <p style={{ fontSize: "12px", color: "#666" }}>Temple Road, Gujarat, India | Contact: +91 98765 43210</p>
                    </div>

                    {/* PDF Body Info */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
                      <div>
                        <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "#9a3412", marginBottom: "5px" }}>Devotee Details</h4>
                        <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>{data.devoteName}</p>
                        <p style={{ fontSize: "13px", margin: "2px 0" }}>Gotra: {data.gotra || "N/A"}</p>
                        <p style={{ fontSize: "13px", margin: "2px 0" }}>{data.address}, {data.city} - {data.pincode}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "#9a3412", marginBottom: "5px" }}>Receipt Info</h4>
                        <p style={{ fontSize: "13px", margin: "2px 0" }}><strong>Booking ID:</strong> {data.bookingId}</p>
                        <p style={{ fontSize: "13px", margin: "2px 0" }}><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* PDF Table */}
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#fff7ed" }}>
                          <th style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "left" }}>Description</th>
                          <th style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "center" }}>Pooja Date</th>
                          <th style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "right" }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "1px solid #fed7aa", padding: "12px" }}>
                            <div style={{ fontWeight: "bold" }}>{data.poojaName}</div>
                            {/* <div style={{ fontSize: "11px", color: "#666" }}>Payment via {data.paymentMethod}</div> */}
                          </td>
                          <td style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "center" }}>{new Date(data.poojaDate).toLocaleDateString()}</td>
                          <td style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "right", fontWeight: "bold" }}>₹{data.amount.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td colSpan={2} style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "right", fontWeight: "bold", backgroundColor: "#fff7ed" }}>Total Paid</td>
                          <td style={{ border: "1px solid #fed7aa", padding: "12px", textAlign: "right", fontWeight: "bold", backgroundColor: "#fff7ed", color: "#ea580c", fontSize: "18px" }}>₹{data.amount.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Footer Message */}
                    <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "20px", borderTop: "1px dashed #ccc" }}>
                      <p style={{ color: "#ea580c", fontSize: "18px", fontWeight: "bold", fontStyle: "italic" }}>Har Har Mahadev!</p>
                      <p style={{ fontSize: "10px", color: "#999", marginTop: "10px" }}>This is an electronically generated document. No signature is required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-8 border rounded-lg shadow-sm bg-card">
              <h3 className="text-xl font-semibold mb-4 text-destructive">Booking Not Confirmed</h3>
              <p className="text-muted-foreground mb-6">
                Your booking payment status is <strong>{data.paymentStatus}</strong>.
                Please ensure your payment is completed for confirmation.
              </p>
              <Link to="/">
                <Button variant="sacred" className="gap-2">
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}