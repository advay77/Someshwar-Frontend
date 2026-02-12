export interface Pooja {
    id: string;
    name: string;
    nameHindi: string;
    price: number;
    description: string;
    duration: string;
    benefits: string[];
    requirements: string[];
    constrains: string[];
    mode: string[]; //"online" , "offline"
    temples: string[];
    image: string;
  }
  
  export interface BookingFormData {
    devoteeName: string;
    gotra: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    poojaId: string;
    poojaDate: string;
    poojaMode: string;
    specialRequirements: string;
    poojaTemple: string;
  }
  
  export interface Booking {
    _id: string;
    bookingId: string;
    devoteeName: string;
    gotra: string;
    email: string;
    phone: string;
    homeAddress: string;
    city: string;
    pinCode: string;
    poojaType: string;
    poojaDate: Date;
    poojaMode: string;
    poojaTemple: string;
    spReq: string;
    amount: number;
    paymentStatus: "Pending" | "Completed" | "Failed";
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  