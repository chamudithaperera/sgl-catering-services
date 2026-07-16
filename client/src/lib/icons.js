import {
  Armchair,
  BadgeCheck,
  Building2,
  Camera,
  ChefHat,
  Clock3,
  HeartHandshake,
  ImagePlus,
  Leaf,
  MapPinned,
  MessageCircle,
  PackageSearch,
  PartyPopper,
  PhoneCall,
  ShieldCheck,
  Soup,
  Sparkles,
  Table2,
  TentTree,
  Trees,
  UtensilsCrossed,
} from "lucide-react";

const iconMap = {
  Armchair,
  BadgeCheck,
  Building2,
  Camera,
  ChefHat,
  Clock3,
  HeartHandshake,
  ImagePlus,
  Leaf,
  MapPinned,
  MessageCircle,
  PackageSearch,
  PartyPopper,
  PhoneCall,
  ShieldCheck,
  Soup,
  Sparkles,
  Table2,
  TentTree,
  Trees,
  UtensilsCrossed,
};

export function getIconComponent(name) {
  return iconMap[name] || Sparkles;
}

