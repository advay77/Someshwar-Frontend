import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, FileText, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Captcha } from "@/components/Captcha";
import { BookingFormData, Pooja } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { createBookingOrder, getAllPujas } from "@/utils/api";
import OhmImage from "/ohm.png";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialFormData: BookingFormData = {
  devoteeName: "",
  gotra: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  poojaId: "",
  poojaDate: "",
  specialRequirements: "",
  poojaMode: "",
  poojaTemple: ""
};

export default function BookingFormPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [poojasLoaded, setPoojasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all poojas on mount
  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const data = await getAllPujas();
        setPoojas(data);
      } catch (err) {
        console.error("Failed to fetch poojas", err);
        toast({
          title: "Error",
          description: "Could not load available poojas. Please try again.",
          variant: "destructive",
        });
      } finally {
        setPoojasLoaded(true);
      }
    };
    fetchPujas();
  }, [toast]);

  // Pre-select pooja from URL param ONLY after poojas are loaded
  useEffect(() => {
    const poojaId = searchParams.get("pooja");
    if (poojaId && poojasLoaded && poojas.length > 0) {
      const isValidPooja = poojas.some((p) => p.id === poojaId);
      if (isValidPooja) {
        setFormData((prev) => ({ ...prev, poojaId }));
      } else {
        toast({
          title: "Invalid Pooja",
          description: "The selected pooja is not available.",
          variant: "destructive",
        });
        // Optionally clear the invalid param
        navigate("/book", { replace: true });
      }
    }
  }, [searchParams, poojas, poojasLoaded, navigate, toast]);

  const selectedPooja = poojas.find((p) => p.id === formData.poojaId);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.devoteeName.trim()) {
      newErrors.devoteeName = "Name is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Valid 6-digit pincode is required";
    }
    if (!formData.poojaId) {
      newErrors.poojaId = "Please select a pooja";
    }
    if (!formData.poojaDate) {
      newErrors.poojaDate = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    if (!captchaVerified) {
      toast({
        title: "CAPTCHA Required",
        description: "Please verify the CAPTCHA to continue",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      ...formData,
      poojaName: selectedPooja?.name,
      amount: selectedPooja?.price,
    };

    try {
      setIsLoading(true);
      // New logic: navigate to a dedicated payment page
      const response = await createBookingOrder(bookingData);
      const data = await response.json();

      if (data.success) {
        navigate(`/payment/${data.bookingId}`);
      } else {
        toast({
          title: "Error",
          description: data.message || "Could not create booking order.",
          variant: "destructive",
        });
      }

    } catch (err) {
      console.error("Payment initiation error:", err);
      toast({
        title: "Error",
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const allowedMonths = 2;

  // Get minimum date (tomorrow)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  //Get maximum date (3 month)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + (allowedMonths * 30));
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Book Your Pooja
            </h1>
            <p className="text-muted-foreground">
              Fill in your details to book a sacred ceremony at Someswar Mahadev Temple
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="h-5 w-5 text-primary" />
                      Devotee Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="devoteeName">Full Name <span className="text-red-500">*</span> </Label>
                        <Input
                          id="devoteeName"
                          placeholder="Enter your full name"
                          value={formData.devoteeName}
                          onChange={(e) => handleChange("devoteeName", e.target.value)}
                          className={errors.devoteeName ? "border-destructive" : ""}
                        />
                        {errors.devoteeName && (
                          <p className="text-xs text-destructive">{errors.devoteeName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gotra">Gotra</Label>
                        <Input
                          id="gotra"
                          placeholder="Enter your gotra (optional)"
                          value={formData.gotra}
                          onChange={(e) => handleChange("gotra", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span> </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">WhatsApp Number <span className="text-red-500">*</span> </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="10-digit mobile number"
                            className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            maxLength={10}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address <span className="text-red-500">*</span> </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          placeholder="Enter your full address for prasad delivery"
                          className={`pl-10 min-h-[80px] ${errors.address ? "border-destructive" : ""}`}
                          value={formData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-xs text-destructive">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City <span className="text-red-500">*</span> </Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          className={errors.city ? "border-destructive" : ""}
                        />
                        {errors.city && (
                          <p className="text-xs text-destructive">{errors.city}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode <span className="text-red-500">*</span> </Label>
                        <Input
                          id="pincode"
                          placeholder="6-digit pincode"
                          value={formData.pincode}
                          onChange={(e) => handleChange("pincode", e.target.value)}
                          maxLength={6}
                          className={errors.pincode ? "border-destructive" : ""}
                        />
                        {errors.pincode && (
                          <p className="text-xs text-destructive">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pooja Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Calendar className="h-5 w-5 text-primary" />
                      Pooja Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Select Pooja <span className="text-red-500">*</span> </Label>
                        <Select
                          value={formData.poojaId}
                          onValueChange={(value) => handleChange("poojaId", value)}
                          disabled={!poojasLoaded}
                        >
                          <SelectTrigger className={errors.poojaId ? "border-destructive" : ""}>
                            {!poojasLoaded ? (
                              <span className="text-muted-foreground">Loading poojas...</span>
                            ) : (
                              <SelectValue placeholder="Choose a pooja" />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {poojas.map((pooja) => (
                              <SelectItem key={pooja.id} value={pooja.id}>
                                {pooja.name} - ₹{pooja.price.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.poojaId && (
                          <p className="text-xs text-destructive">{errors.poojaId}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="poojaDate">Preferred Date <span className="text-red-500">*</span> </Label>
                        <Input
                          id="poojaDate"
                          type="date"
                          min={minDateStr}
                          max={maxDateStr}
                          value={formData.poojaDate}
                          onChange={(e) => handleChange("poojaDate", e.target.value)}
                          className={errors.poojaDate ? "border-destructive" : ""}
                        />
                        {errors.poojaDate && (
                          <p className="text-xs text-destructive">{errors.poojaDate}</p>
                        )}
                      </div>
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="poojaMode">Preferred Pooja Mode <span className="text-red-500">*</span> </Label>
                      <Select
                        value={formData.poojaMode}
                        onValueChange={(value) => handleChange("poojaMode", value)}
                      >
                        <SelectTrigger className={errors.poojaMode ? "border-destructive" : ""}>
                          <SelectValue placeholder="Choose a pooja mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.poojaMode && (
                          <p className="text-xs text-destructive">{errors.poojaMode}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poojaTemple">Pooja Temple <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.poojaTemple}
                        onValueChange={(value) => handleChange("poojaTemple", value)}
                      >
                        <SelectTrigger className={errors.poojaTemple ? "border-destructive" : ""}>
                          <SelectValue placeholder="Choose a temple" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="someswar mahadev">Someswar Mahadev</SelectItem>                          
                          <SelectItem value="someswar mahadev">Temple 2</SelectItem>                          
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {formData.poojaMode === "online" && (
                    <Alert>
                      <AlertDescription>
                        <ShieldAlert className="text-red-500 mb-2" />
                        {" "}
                        You've selected Online mode. The video of the pooja will be sent to you via WhatsApp or email. Your prasence is not required.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="specialRequirements"
                        placeholder="Any special requests or instructions (optional)"
                        className="pl-10 min-h-[80px]"
                        value={formData.specialRequirements}
                        onChange={(e) => handleChange("specialRequirements", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CAPTCHA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Security Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <Captcha onVerify={setCaptchaVerified} />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-primary/20">
                  <CardHeader className="bg-gradient-sacred text-primary-foreground rounded-t-xl">
                    <CardTitle className="text-xl">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {selectedPooja ? (
                      <>
                        <div className="flex justify-center mb-4">
                          <img
                            src={selectedPooja.image || OhmImage}
                            alt="Pray"
                            className="h-16 w-16 flex-shrink-0 rounded-sm"
                          />
                        </div>
                        <h3 className="font-serif font-semibold text-lg text-center">
                          {selectedPooja.name}
                        </h3>
                        <p className="text-sm text-center text-temple-gold">
                          {selectedPooja.nameHindi}
                        </p>
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{selectedPooja.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pooja Fee:</span>
                            <span>₹{selectedPooja.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Prasad Delivery:</span>
                            <span className="text-primary">Free</span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-primary">
                              ₹{selectedPooja.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <div className="flex justify-center mb-2">
                          <img
                            src={OhmImage}
                            alt="Pray"
                            className="h-16 w-16 flex-shrink-0 rounded-sm"
                          />
                        </div>
                        <p>Please select a pooja to see summary</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="sacred"
                      size="lg"
                      className="w-full mt-4"
                      disabled={!captchaVerified || !selectedPooja || isLoading}
                    >
                      Proceed to Payment
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-2">
                      By proceeding, you agree to our terms and conditions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
}