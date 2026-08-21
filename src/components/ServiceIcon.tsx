import React from 'react';
import {
  Search,
  Newspaper,
  ScanEye,
  Languages,
  TrendingUp,
  GraduationCap,
  Mail,
  Video,
  MessageSquare,
  Users,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCheck,
  StickyNote,
  Calendar,
  Layout,
  HardDrive,
  Image,
  Database,
  PlaySquare,
  BarChart2,
  Music,
  Smile,
  MapPin,
  Globe,
  Plane,
  Sparkles,
  Cpu,
  BookOpen,
  Layers,
  Terminal,
  Megaphone,
  DollarSign,
  PieChart,
  Store,
  SearchCode,
  Flame,
  Cloud,
  Map,
  Code2,
  BookMarked,
  Palette,
  Play,
  Smartphone,
  Watch,
  Home,
  KeyRound,
  Compass,
  Type,
  LocateFixed,
  ShieldCheck,
  ExternalLink,
  Code,
  Briefcase,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Search,
  Newspaper,
  ScanEye,
  Languages,
  TrendingUp,
  GraduationCap,
  Mail,
  Video,
  MessageSquare,
  Users,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCheck,
  StickyNote,
  Calendar,
  Layout,
  HardDrive,
  Image,
  Database,
  PlaySquare,
  BarChart2,
  Music,
  Smile,
  MapPin,
  Globe,
  Plane,
  Sparkles,
  Cpu,
  BookOpen,
  Layers,
  Terminal,
  Megaphone,
  DollarSign,
  PieChart,
  Store,
  SearchCode,
  Flame,
  Cloud,
  Map,
  Code2,
  BookMarked,
  Palette,
  Play,
  Smartphone,
  Watch,
  Home,
  KeyRound,
  Compass,
  Type,
  LocateFixed,
  ShieldCheck,
  ExternalLink,
  Code,
  Briefcase
};

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
  colorHex?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  name,
  className = 'w-6 h-6 text-yellow-400',
  size,
  colorHex,
}) => {
  const IconComponent = iconMap[name] || Globe;
  // Always render with vivid yellow (#FACC15) as requested by user
  const effectiveColor = '#FACC15';
  return (
    <IconComponent 
      className={`${className} text-yellow-400`} 
      size={size} 
      style={{ color: effectiveColor }} 
    />
  );
};
