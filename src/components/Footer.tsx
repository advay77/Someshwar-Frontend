import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { config } from "../lib/config";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
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
                <h3 className="font-serif text-lg font-bold">{t('footer.temple.title')}</h3>
                <p className="text-sm opacity-80">Temple</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Experience divine blessings through authentic Vedic rituals performed by experienced priests.
              Book your pooja online and receive video proof of you pooja at your convenient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t('footer.quickLinks.title')}</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                {t('footer.quickLinks.home')}
              </Link>
              <Link to="/poojas" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                {t('footer.quickLinks.allPoojas')}
              </Link>
              <Link to="/booking" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                {t('footer.quickLinks.bookPooja')}
              </Link>
              <Link to="/admin" className="block text-sm opacity-80 hover:opacity-100 hover:text-temple-gold transition-all">
                Admin Panel
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t('footer.contact.title')}</h4>
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
            <h4 className="font-serif text-lg font-semibold">{t('footer.templeHours.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('footer.templeHours.morningAarti')}</p>
                  <p>{config.templeHours.morning}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('footer.templeHours.eveningAarti')}</p>
                  <p>{config.templeHours.evening}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-80">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t('footer.templeHours.dailyDarshan')}</p>
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
              © 2026 Someswar Mahadev Temple. All rights reserved.
            </p>
            <p className="text-sm opacity-60">
              {t('footer.copyright.managedBy')}
            </p>
            <p className="text-sm opacity-60">
              Developed and Maintained by Vision mentix software
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
