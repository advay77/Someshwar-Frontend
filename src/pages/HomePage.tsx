import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PoojaCard } from "@/components/PoojaCard";
import templeHero from "/images/temple-hero.jpg";
import image1 from "/images/image.png";
import image2 from "/images/image1.png";
import image3 from "/images/image2.png";
import PraySvg from "/pray.svg";
import { useEffect, useState } from "react";
import { getAllPujas } from "@/utils/api";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const [featuredPoojas, setFeaturedPoojas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  const backgroundImages = [image1, image2, image3];

  const features = [
    {
      icon: Shield,
      title: t('features.authentic.title'),
      description: t('features.authentic.description')
    },
    {
      icon: Users,
      title: t('features.expert.title'),
      description: t('features.expert.description')
    },
    {
      icon: Clock,
      title: t('features.convenient.title'),
      description: t('features.convenient.description')
    },
    {
      icon: Star,
      title: t('features.divine.title'),
      description: t('features.divine.description')
    }
  ];

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        setIsLoading(true);
        const allPujas = await getAllPujas();
        setFeaturedPoojas(allPujas.slice(0, 3));
      } catch (error) {
        console.error("Error fetching poojas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoojas();
  }, []);

  // Background image switching effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Someswar Mahadev Temple background ${index + 1}`}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-temple-gold/20 backdrop-blur border border-temple-gold/30">
              <img
                src={PraySvg}
                alt="Pray"
                className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 rounded-sm"
              />
              <span className="text-xs sm:text-sm font-medium text-temple-gold">
                {t('hero.tagline')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground leading-tight px-2">
              {t('hero.title')}
              <span className="block text-temple-gold mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto px-4 sm:px-0">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 sm:px-0">
              <Link to="/poojas">
                <Button variant="sacred" size="lg" className="gap-2 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">
                  {t('hero.explorePoojas')}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">
                  {t('hero.bookNow')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-temple-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary sacred-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-3 sm:mb-4">
              {t('features.title')}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-card rounded-xl border shadow-sacred text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-sacred flex items-center justify-center">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif font-semibold text-base sm:text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Info Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">
              {t('howItWorks.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
              {[
                { step: "1", title: t('howItWorks.steps.choose.title'), desc: t('howItWorks.steps.choose.description') },
                { step: "2", title: t('howItWorks.steps.book.title'), desc: t('howItWorks.steps.book.description') },
                { step: "3", title: t('howItWorks.steps.receive.title'), desc: t('howItWorks.steps.receive.description') },
              ].map((item) => (
                <div key={item.step} className="text-center bg-card rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-sacred flex items-center justify-center text-lg sm:text-xl font-bold text-primary-foreground shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-serif font-semibold text-sm sm:text-base md:text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-2 sm:px-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Poojas Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary sacred-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sm:mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {t('popularPoojas.title')}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t('popularPoojas.subtitle')}
              </p>
            </div>
            <Link to="/poojas">
              <Button variant="outline" className="gap-2 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">
                {t('popularPoojas.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
              <p className="text-base sm:text-lg">{t('popularPoojas.loading')}</p>
            </div>
          ) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredPoojas.map((pooja, index) => (
              <div
                key={pooja.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PoojaCard pooja={pooja} featured={index === 0} />
              </div>
            ))}
          </div>)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-temple text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="text-4xl sm:text-5xl flex items-center justify-center animate-float">
              <img
                src={PraySvg}
                alt="Pray"
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex-shrink-0 rounded-sm"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold px-4 sm:px-0">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg opacity-90 px-4 sm:px-0 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link to="/booking">
              <Button variant="gold" size="lg" className="gap-2 mt-2 sm:mt-4 text-sm sm:text-base py-2 sm:py-3 px-6 sm:px-8">
                {t('cta.bookNow')}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
