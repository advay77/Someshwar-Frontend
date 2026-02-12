import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { config } from "../lib/config";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Temple Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-sacred">
                <span className="text-xl font-bold">ॐ</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Someswar Mahadev</h3>
                <p className="text-sm opacity-80">Temple Trust</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Experience divine blessings through authentic Vedic rituals performed by experienced priests.
              Book your pooja online and receive the video proof of you pooja at your convenient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                Home
              </Link>
              <Link to="/poojas" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                All Poojas
              </Link>
              <Link to="/booking" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                Book Pooja
              </Link>
              <Link to="/admin" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                Admin Panel
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <a href={`tel:${config.contact.phone}`} className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 {config.contact.phone}</span>
              </a>
              <a href={`mailto:${config.contact.email}`} className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{config.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{config.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Temple Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Temple Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Morning Aarti</p>
                  <p>{config.templeHours.morning}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Evening Aarti</p>
                  <p>{config.templeHours.evening}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Daily Darshan</p>
                  <p>{config.templeHours.daily}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">
              © 2024 Someswar Mahadev Temple Trust. All rights reserved.
            </p>
            <p className="text-sm opacity-60">
              Managed by Pandit Sailendra Puri Ji
            </p>
            <p className="text-sm opacity-60">
              Design and Developed by Vision Mentix Software Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
