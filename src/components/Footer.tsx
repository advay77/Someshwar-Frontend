import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { config } from "../lib/config";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Temple Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-sacred">
                <span className="text-lg sm:text-xl font-bold">ॐ</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold">{t('footer.temple.title')}</h3>
                <p className="text-xs sm:text-sm opacity-80">Temple</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              Experience divine blessings through authentic Vedic rituals performed by experienced priests.
              Book your pooja online and receive video proof of you pooja at your convenient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-semibold">{t('footer.quickLinks.title')}</h4>
            <nav className="space-y-1 sm:space-y-2">
              <Link to="/" className="block text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all py-1">
                {t('footer.quickLinks.home')}
              </Link>
              <Link to="/poojas" className="block text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all py-1">
                {t('footer.quickLinks.allPoojas')}
              </Link>
              <Link to="/booking" className="block text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all py-1">
                {t('footer.quickLinks.bookPooja')}
              </Link>
              <Link to="/admin" className="block text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all py-1">
                Admin Panel
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-semibold">{t('footer.contact.title')}</h4>
            <div className="space-y-2 sm:space-y-3">
              <a href={`tel:${config.contact.phone}`} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity py-1">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 {config.contact.phone}</span>
              </a>
              <a href={`mailto:${config.contact.email}`} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity py-1">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{config.contact.email}</span>
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 py-1">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{config.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Temple Hours */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-semibold">{t('footer.templeHours.title')}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 py-1">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">{t('footer.templeHours.morningAarti')}</p>
                  <p className="text-xs sm:text-sm">{config.templeHours.morning}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 py-1">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">{t('footer.templeHours.eveningAarti')}</p>
                  <p className="text-xs sm:text-sm">{config.templeHours.evening}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 py-1">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">{t('footer.templeHours.dailyDarshan')}</p>
                  <p className="text-xs sm:text-sm">{config.templeHours.daily}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm opacity-60">
              © 2026 Someswar Mahadev Temple. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm opacity-60">
              {t('footer.copyright.managedBy')}
            </p>
            <p className="text-xs sm:text-sm opacity-60">
              Developed and Maintained by Vision mentix software
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
