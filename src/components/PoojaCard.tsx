import { Link } from "react-router-dom";
import { Clock, IndianRupee, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pooja } from "@/types";
import defaultPoojaImage from "/images/default-puja.png";

interface PoojaCardProps {
  pooja: Pooja;
  featured?: boolean;
}

export function PoojaCard({ pooja, featured = false }: PoojaCardProps) {
  return (
    <Card className={`group overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${featured ? 'border-temple-gold border-2' : ''}`}>
      {/* Image Section */}
      <div className="relative h-40 bg-gradient-sacred flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={`/images/${Math.floor(Math.random() * 5) + 9}.webp`} alt={pooja.name} className="w-full h-full object-cover" />
        {featured && (
          <Badge className="absolute top-3 right-3 bg-temple-gold text-foreground">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
      </div>

      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {pooja.name}
        </CardTitle>
        <p className="text-sm text-temple-gold font-medium line-clamp-1">{pooja.nameHindi}</p>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {pooja.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{pooja.duration}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-primary">
            <IndianRupee className="h-4 w-4" />
            <span>{pooja.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Benefits Preview */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {pooja.benefits.slice(0, 2).map((benefit, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {benefit}
            </Badge>
          ))}
          {pooja.benefits.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{pooja.benefits.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-2 flex-shrink-0 pt-4">
        <Link to={`/poojas`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            View More
          </Button>
        </Link>
        <Link to={`/booking?pooja=${pooja.id}`} className="flex-1">
          <Button variant="sacred" className="w-full" size="sm">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}