import { Link } from "react-router-dom";
import { Clock, IndianRupee, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { getAllPujas } from "@/utils/api";
import defaultPoojaImage from "/images/default-puja.png";


export default function PoojaListingPage() {
  const [poojas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const sortedPujas = useMemo(() => {
    const sortablePujas = [...poojas];

    if (sortBy === "name-asc") {
      sortablePujas.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sortablePujas.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "price-asc") {
      sortablePujas.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortablePujas.sort((a, b) => b.price - a.price);
    }

    return sortablePujas;
  }, [poojas, sortBy]);

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const data = await getAllPujas();
        setPujas(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPujas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-xl text-muted-foreground">Loading Sacred Poojas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <p className="text-xl text-red-500">Error loading Poojas</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-sacred text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
            <h1 className="text-3xl md:text-5xl font-serif font-bold">
              Sacred Poojas & Rituals
            </h1>
            <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto px-4">
            Choose from our comprehensive list of Vedic ceremonies performed with
            authentic mantras and traditional rituals by Pandit Sailendra Puri Ji.
          </p>
        </div>
      </section>
      
      {/* Poojas Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <p className="text-sm text-muted-foreground hidden md:block">
              {sortedPujas.length} Sacred Ceremonies Available
            </p>
            <select
              className="p-2 md:p-2.5 border rounded-lg bg-card text-card-foreground shadow-sm text-sm w-full md:w-auto focus:ring-2 focus:ring-primary transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort By: Default</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {sortedPujas.map((pooja, index) => (
              <Card
                key={pooja.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up border-2 hover:border-primary/20 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative w-full h-48 md:h-56 flex-shrink-0 bg-gradient-sacred overflow-hidden">
                    <img
                      src={`/images/${Math.floor(pooja.id % 22) + 1}.webp`}
                      alt={pooja.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Price Badge - Repositioned */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-1 text-lg md:text-xl font-bold text-primary">
                        <IndianRupee className="h-4 w-4 md:h-5 md:w-5" />
                        {pooja.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{pooja.duration}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col">
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="text-xl md:text-2xl mb-1.5 line-clamp-2">{pooja.name}</CardTitle>
                      <p className="text-sm md:text-base text-temple-gold font-medium">
                        {pooja.nameHindi}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 md:space-y-5 pt-0">
                      {/* Description */}
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3">
                        {pooja.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2.5">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Key Benefits
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {pooja.benefits.slice(0, 4).map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground bg-primary/5 rounded-lg p-2"
                            >
                              <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        {pooja.benefits.length > 4 && (
                          <p className="text-xs text-muted-foreground italic">
                            +{pooja.benefits.length - 4} more benefits
                          </p>
                        )}
                      </div>

                      {/* Mode Tags */}
                      {pooja.mode && pooja.mode.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pooja.mode.map((mode, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize border border-primary/20"
                            >
                              {mode}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Collapsible Sections - Hidden on mobile by default */}
                      <details className="group/details">
                        <summary className="cursor-pointer text-xs font-semibold text-primary uppercase tracking-wide list-none flex items-center gap-2 hover:text-primary/80 transition-colors">
                          <ArrowRight className="h-3.5 w-3.5 group-open/details:rotate-90 transition-transform" />
                          View More Details
                        </summary>
                        <div className="mt-3 space-y-4 pl-5 border-l-2 border-primary/20">
                          {/* Requirements */}
                          {pooja.requirements && pooja.requirements.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                Requirements
                              </p>
                              <div className="space-y-1.5">
                                {pooja.requirements.map((requirement, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                                  >
                                    <ArrowRight className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span>{requirement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Constraints */}
                          {pooja.constrains && pooja.constrains.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                Constraints
                              </p>
                              <div className="space-y-1.5">
                                {pooja.constrains.map((constrain, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                                  >
                                    <ArrowRight className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span>{constrain}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Temples */}
                          {pooja.temples && pooja.temples.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                Available Temples
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {pooja.temples.map((temple, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs rounded-md border border-blue-500/20"
                                  >
                                    {temple}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="border-t pt-4 bg-secondary/30">
                      <Link to={`/booking?pooja=${pooja.id}`} className="w-full">
                        <Button variant="sacred" className="w-full gap-2 h-11 md:h-12 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                          Book This Pooja
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}