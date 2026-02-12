import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import HomePage from "./pages/HomePage";
import PoojaListingPage from "./pages/PoojaListingPage";
import BookingFormPage from "./pages/BookingFormPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PaymentPage from "./pages/PaymentPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PoojaAdminPage from "./pages/PoojaAdminPage";
import CreatePoojaPage from "./pages/CreatePoojaPage";
import EditPoojaPage from "./pages/EditPoojaPage";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider> {/* Wrap the application with AuthProvider */}
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/poojas" element={<PoojaListingPage />} />
                <Route path="/booking" element={<BookingFormPage />} />
                <Route path="/payment/:bookingId" element={<PaymentPage />} />
                <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />

                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/pujas" element={<PoojaAdminPage />} />
                  <Route path="/admin/pujas/new" element={<CreatePoojaPage />} />
                  <Route path="/admin/pujas/edit/:id" element={<EditPoojaPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
