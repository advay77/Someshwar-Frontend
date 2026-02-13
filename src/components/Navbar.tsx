import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home, BookOpen, CalendarPlus, ShieldCheck, Globe } from "lucide-react"; // Added ShieldCheck and Globe
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { config } from "../lib/config";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useLanguage } from "../context/LanguageContext"; // Import useLanguage

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth(); // Use isAdmin and logout from AuthContext
  const { language, toggleLanguage, t } = useLanguage(); // Use language context

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu on logout
  };

  const baseNavLinks = [
    { href: "/", label: t('nav.home'), icon: Home },
    { href: "/poojas", label: t('nav.poojas'), icon: BookOpen },
    { href: "/booking", label: t('nav.bookNow'), icon: CalendarPlus },
  ];

  const adminNavLinks = isAdmin
    ? [...baseNavLinks, { href: "/admin", label: t('nav.admin'), icon: ShieldCheck }]
    : baseNavLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-sacred">
              <span className="text-lg font-bold text-primary-foreground">ॐ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg font-bold text-foreground">
                {t('nav.templeName')}
              </h1>
              <p className="text-xs text-muted-foreground">Online Pooja Booking</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {adminNavLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive(link.href) && "bg-primary text-primary-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                {t('nav.logout')}
              </Button>
            )}
            {/* Language Toggle Button */}
            <div className="ml-4 pl-4 border-l border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="gap-2 hover:bg-temple-gold/10 transition-colors"
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'EN' : 'हि'}
              </Button>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="https://wa.me/919305749992" target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>

              +91 {config.contact.phone}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-card animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 w-full justify-start">
                {t('nav.logout')}
              </Button>
            )}
            {/* Language Toggle Button - Mobile */}
            <div className="border-t border-border pt-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="gap-2 w-full justify-start hover:bg-temple-gold/10 transition-colors"
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              </Button>
            </div>
            <a href="https://wa.me/919305749992" target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>

              +91 {config.contact.phone}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
