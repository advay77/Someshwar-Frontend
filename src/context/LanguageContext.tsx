import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Navigation
    nav: {
      templeName: 'Someswar Mahadev',
      home: 'Home',
      poojas: 'Poojas',
      bookNow: 'Book Now',
      admin: 'Admin',
      logout: 'Logout',
    },
    // HomePage
    hero: {
      tagline: 'Om Namah Shivaya',
      title: 'Someswar Mahadev',
      subtitle: 'Online Pooja Booking',
      description: 'Experience divine blessings from the sacred Someswar Mahadev Temple. Book authentic Vedic poojas online and receive prasad at your doorstep.',
      explorePoojas: 'Explore Poojas',
      bookNow: 'Book Now',
    },
    features: {
      title: 'Why Choose Our Temple?',
      subtitle: 'Trusted by thousands of devotees across India for authentic Vedic ceremonies',
      authentic: {
        title: 'Authentic Rituals',
        description: 'Traditional Vedic ceremonies performed by experienced priests',
      },
      expert: {
        title: 'Expert Pandits',
        description: 'Led by Pandit Sailendra Puri with 25+ years of experience',
      },
      convenient: {
        title: 'Convenient Booking',
        description: 'Book online anytime and receive video of your pooja',
      },
      divine: {
        title: 'Divine Blessings',
        description: 'Receive prasad and blessings at your doorstep',
      },
    },
    howItWorks: {
      title: 'How It Works',
      steps: {
        choose: {
          title: 'Choose Pooja',
          description: 'Select the sacred ceremony that matches your needs',
        },
        book: {
          title: 'Book & Pay',
          description: 'Fill in your details and make secure payment',
        },
        receive: {
          title: 'Receive Blessings',
          description: 'Watch the ceremony and receive blessings at your doorstep',
        },
      },
    },
    popularPoojas: {
      title: 'Popular Poojas',
      subtitle: 'Most sought-after sacred ceremonies for divine blessings',
      viewAll: 'View All Poojas',
      loading: 'Loading Poojas...',
    },
    cta: {
      title: 'Ready to Receive Divine Blessings?',
      description: 'Book your pooja today and experience the sacred rituals from the comfort of your home. Pandit Sailendra Puri Ji will personally perform your pooja with utmost devotion.',
      bookNow: 'Book Your Pooja Now',
    },
    // Footer
    footer: {
      temple: {
        title: 'Someswar Mahadev',
        subtitle: 'Temple Trust',
        description: 'Experience divine blessings through authentic Vedic rituals performed by experienced priests. Book your pooja online and receive video proof of you pooja at your convenient.',
      },
      quickLinks: {
        title: 'Quick Links',
        home: 'Home',
        allPoojas: 'All Poojas',
        bookPooja: 'Book Pooja',
        adminPanel: 'Admin Panel',
      },
      contact: {
        title: 'Contact Us',
      },
      templeHours: {
        title: 'Temple Hours',
        morningAarti: 'Morning Aarti',
        eveningAarti: 'Evening Aarti',
        dailyDarshan: 'Daily Darshan',
      },
      copyright: {
        rights: '© 2024 Someswar Mahadev Temple Trust. All rights reserved.',
        managedBy: 'Managed by Pandit Sailendra Puri Ji',
        developedBy: 'Design and Developed by Vision Mentix Software Pvt Ltd',
      },
    },
    // Booking Page
    booking: {
      title: 'Book Your Pooja',
      subtitle: 'Fill in your details to book a sacred ceremony at Someswar Mahadev Temple',
      devoteeDetails: 'Devotee Details',
      fullName: 'Full Name',
      gotra: 'Gotra',
      emailAddress: 'Email Address',
      whatsappNumber: 'WhatsApp Number',
      address: 'Address',
      city: 'City',
      pincode: 'Pincode',
      poojaDetails: 'Pooja Details',
      selectPooja: 'Select Pooja',
      preferredDate: 'Preferred Date',
      preferredMode: 'Preferred Pooja Mode',
      poojaTemple: 'Pooja Temple',
      specialRequirements: 'Special Requirements',
      securityVerification: 'Security Verification',
      bookingSummary: 'Booking Summary',
      duration: 'Duration',
      poojaFee: 'Pooja Fee',
      prasadDelivery: 'Prasad Delivery',
      total: 'Total',
      proceedToPayment: 'Proceed to Payment',
      termsAgreement: 'By proceeding, you agree to our terms and conditions',
      onlineMode: 'Online',
      offlineMode: 'Offline',
      onlineModeAlert: 'You\'ve selected Online mode. The video of pooja will be sent to you via WhatsApp or email. Your prasence is not required.',
      errors: {
        nameRequired: 'Name is required',
        emailRequired: 'Valid email is required',
        phoneRequired: 'Valid 10-digit phone number is required',
        addressRequired: 'Address is required',
        cityRequired: 'City is required',
        pincodeRequired: 'Valid 6-digit pincode is required',
        poojaRequired: 'Please select a pooja',
        dateRequired: 'Please select a date',
      },
      placeholders: {
        fullName: 'Enter your full name',
        gotra: 'Enter your gotra (optional)',
        email: 'your@email.com',
        phone: '10-digit mobile number',
        address: 'Enter your full address for prasad delivery',
        city: 'City',
        pincode: '6-digit pincode',
        choosePooja: 'Choose a pooja',
        chooseMode: 'Choose a pooja mode',
        chooseTemple: 'Choose a temple',
        specialRequests: 'Any special requests or instructions (optional)',
      },
    },
  },
  hi: {
    // Navigation
    nav: {
      templeName: 'सोमेश्वर महादेव',
      home: 'होम',
      poojas: 'पूजा',
      bookNow: 'अभी बुक करें',
      admin: 'एडमिन',
      logout: 'लॉगआउट',
    },
    // HomePage
    hero: {
      tagline: 'ॐ नमः शिवाय',
      title: 'सोमेश्वर महादेव',
      subtitle: 'ऑनलाइन पूजा बुकिंग',
      description: 'पवित्र सोमेश्वर महादेव मंदिर से दिव्य आशीर्वाद प्राप्त करें। प्रामाणिक वैदिक पूजाएं ऑनलाइन बुक करें और अपने घर पर प्रसाद प्राप्त करें।',
      explorePoojas: 'पूजा देखें',
      bookNow: 'अभी बुक करें',
    },
    features: {
      title: 'हमारे मंदिर को क्यों चुनें?',
      subtitle: 'प्रामाणिक वैदिक समारोहों के लिए भारत भर में हजारों भक्तों द्वारा विश्वसनीय',
      authentic: {
        title: 'प्रामाणिक अनुष्ठान',
        description: 'अनुभवी पुजारियों द्वारा पारंपरिक वैदिक समारोह',
      },
      expert: {
        title: 'विशेषज्ञ पंडित',
        description: '25+ वर्षों के अनुभव के साथ पंडित साईलेंद्र पुरी के नेतृत्व में',
      },
      convenient: {
        title: 'सुविधाजनक बुकिंग',
        description: 'कभी भी ऑनलाइन बुक करें और अपनी पूजा का वीडियो प्राप्त करें',
      },
      divine: {
        title: 'दिव्य आशीर्वाद',
        description: 'अपने घर पर प्रसाद और आशीर्वाद प्राप्त करें',
      },
    },
    howItWorks: {
      title: 'यह कैसे काम करता है',
      steps: {
        choose: {
          title: 'पूजा चुनें',
          description: 'अपनी जरूरतों के अनुसार पवित्र समारोह चुनें',
        },
        book: {
          title: 'बुक करें और भुगतान करें',
          description: 'अपना विवरण भरें और सुरक्षित भुगतान करें',
        },
        receive: {
          title: 'आशीर्वाद प्राप्त करें',
          description: 'समारोह देखें और अपने घर पर आशीर्वाद प्राप्त करें',
        },
      },
    },
    popularPoojas: {
      title: 'लोकप्रिय पूजाएं',
      subtitle: 'दिव्य आशीर्वाद के लिए सबसे अधिक मांगी जाने वाली पवित्र समारोह',
      viewAll: 'सभी पूजा देखें',
      loading: 'पूजा लोड हो रही है...',
    },
    cta: {
      title: 'दिव्य आशीर्वाद प्राप्त करने के लिए तैयार हैं?',
      description: 'आज अपनी पूजा बुक करें और अपने घर के आराम से पवित्र अनुष्ठानों का अनुभव करें। पंडित साईलेंद्र पुरी जी व्यक्तिगत रूप से आपकी पूजा अत्यधिक भक्ति के साथ करेंगे।',
      bookNow: 'अपनी पूजा अभी बुक करें',
    },
    // Footer
    footer: {
      temple: {
        title: 'सोमेश्वर महादेव',
        subtitle: 'मंदिर ट्रस्ट',
        description: 'अनुभवी पुजारियों द्वारा प्रदर्शित प्रामाणिक वैदिक अनुष्ठानों के माध्यम से दिव्य आशीर्वाद प्राप्त करें। अपनी पूजा ऑनलाइन बुक करें और अपने सुविधाजनक समय पर अपनी पूजा का वीडियो प्रमाण प्राप्त करें।',
      },
      quickLinks: {
        title: 'त्वरित लिंक',
        home: 'होम',
        allPoojas: 'सभी पूजाएं',
        bookPooja: 'पूजा बुक करें',
        adminPanel: 'एडमिन पैनल',
      },
      contact: {
        title: 'संपर्क करें',
      },
      templeHours: {
        title: 'मंदिर समय',
        morningAarti: 'सुबह की आरती',
        eveningAarti: 'शाम की आरती',
        dailyDarshan: 'दैनिक दर्शन',
      },
      copyright: {
        rights: '© 2024 सोमेश्वर महादेव मंदिर ट्रस्ट। सभी अधिकार सुरक्षित।',
        managedBy: 'पंडित साईलेंद्र पुरी जी द्वारा प्रबंधित',
        developedBy: 'डिजाइन और विकसित विजन मेंटिक्स सॉफ्टवेयर प्राइवेट लिमिटेड द्वारा',
      },
    },
    // Booking Page
    booking: {
      title: 'अपनी पूजा बुक करें',
      subtitle: 'सोमेश्वर महादेव मंदिर में पवित्र समारोह बुक करने के लिए अपना विवरण भरें',
      devoteeDetails: 'भक्त विवरण',
      fullName: 'पूरा नाम',
      gotra: 'गोत्र',
      emailAddress: 'ईमेल पता',
      whatsappNumber: 'व्हाट्सएप नंबर',
      address: 'पता',
      city: 'शहर',
      pincode: 'पिनकोड',
      poojaDetails: 'पूजा विवरण',
      selectPooja: 'पूजा चुनें',
      preferredDate: 'पसंदीदा तिथि',
      preferredMode: 'पसंदीदा पूजा मोड',
      poojaTemple: 'पूजा मंदिर',
      specialRequirements: 'विशेष आवश्यकताएं',
      securityVerification: 'सुरक्षा सत्यापन',
      bookingSummary: 'बुकिंग सारांश',
      duration: 'अवधि',
      poojaFee: 'पूजा शुल्क',
      prasadDelivery: 'प्रसाद डिलीवरी',
      total: 'कुल',
      proceedToPayment: 'भुगतान पर जाएं',
      termsAgreement: 'आगे बढ़कर, आप हमारे नियमों और शर्तों से सहमत हैं',
      onlineMode: 'ऑनलाइन',
      offlineMode: 'ऑफलाइन',
      onlineModeAlert: 'आपने ऑनलाइन मोड चुना है। पूजा का वीडियो आपको व्हाट्सएप या ईमेल के माध्यम से भेजा जाएगा। आपकी उपस्थिति आवश्यक नहीं है।',
      errors: {
        nameRequired: 'नाम आवश्यक है',
        emailRequired: 'वैध ईमेल आवश्यक है',
        phoneRequired: 'वैध 10-अंकीय फोन नंबर आवश्यक है',
        addressRequired: 'पता आवश्यक है',
        cityRequired: 'शहर आवश्यक है',
        pincodeRequired: 'वैध 6-अंकीय पिनकोड आवश्यक है',
        poojaRequired: 'कृपया एक पूजा चुनें',
        dateRequired: 'कृपया एक तिथि चुनें',
      },
      placeholders: {
        fullName: 'अपना पूरा नाम दर्ज करें',
        gotra: 'अपना गोत्र दर्ज करें (वैकल्पिक)',
        email: 'आपका@ईमेल.com',
        phone: '10-अंकीय मोबाइल नंबर',
        address: 'प्रसाद डिलीवरी के लिए अपना पूरा पता दर्ज करें',
        city: 'शहर',
        pincode: '6-अंकीय पिनकोड',
        choosePooja: 'एक पूजा चुनें',
        chooseMode: 'एक पूजा मोड चुनें',
        chooseTemple: 'एक मंदिर चुनें',
        specialRequests: 'कोई विशेष अनुरोध या निर्देश (वैकल्पिक)',
      },
    },
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('hi');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallback: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
