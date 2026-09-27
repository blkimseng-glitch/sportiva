import type { LucideIcon } from "lucide-react";

export interface SectionHeadingData {
  label: string;
  title: string;
  description?: string;
}

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: number | null;
}

export interface TeamMemberSocial {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
  isPlaceholder: boolean;
  socials: TeamMemberSocial[];
}

export interface OrgDepartment {
  icon: LucideIcon;
  title: string;
  description: string;
  members: string[];
}

export interface WhyCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
}