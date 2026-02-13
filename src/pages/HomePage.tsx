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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-temple-gold/20 backdrop-blur border border-temple-gold/30">
              <img
                src={PraySvg}
                alt="Pray"
                className="h-6 w-6 flex-shrink-0 rounded-sm"
              />
              <span className="text-sm font-medium text-temple-gold">
                {t('hero.tagline')}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight">
              {t('hero.title')}
              <span className="block text-temple-gold mt-2">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/poojas">
                <Button variant="sacred" size="xl" className="gap-2 w-full sm:w-auto">
                  {t('hero.explorePoojas')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  {t('hero.bookNow')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-temple-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary sacred-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-xl border shadow-sacred text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-sacred flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Info Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {t('howItWorks.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
              {[
                { step: "1", title: t('howItWorks.steps.choose.title'), desc: t('howItWorks.steps.choose.description') },
                { step: "2", title: t('howItWorks.steps.book.title'), desc: t('howItWorks.steps.book.description') },
                { step: "3", title: t('howItWorks.steps.receive.title'), desc: t('howItWorks.steps.receive.description') },
              ].map((item) => (
                <div key={item.step} className="text-center bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-sacred flex items-center justify-center text-xl font-bold text-primary-foreground shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-serif font-semibold text-base md:text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Poojas Section */}
      <section className="py-20 bg-secondary sacred-pattern ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {t('popularPoojas.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('popularPoojas.subtitle')}
              </p>
            </div>
            <Link to="/poojas">
              <Button variant="outline" className="gap-2">
                {t('popularPoojas.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-xl">{t('popularPoojas.loading')}</p>
            </div>
          ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="py-20 bg-gradient-temple text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-5xl flex items-center justify-center animate-float">
              <img
                src={PraySvg}
                alt="Pray"
                className="h-16 w-16 flex-shrink-0 rounded-sm"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {t('cta.title')}
            </h2>
            <p className="text-lg opacity-90">
              {t('cta.description')}
            </p>
            <Link to="/booking">
              <Button variant="gold" size="xl" className="gap-2 mt-4">
                {t('cta.bookNow')}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
