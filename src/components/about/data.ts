import {
  CalendarDays,
  Code,
  Dumbbell,
  Languages,
  Mail,
  MapPin,
  Newspaper,
  Palette,
  PenTool,
  Phone,
  Search,
  Users,
} from "lucide-react";

import type {
  ContactInfoItem,
  FeatureCard,
  OrgDepartment,
  SectionHeadingData,
  StatItem,
  TeamMember,
  WhyCard,
} from "./types";

/**
 * NOTE: All About Us content is static today and lives on the frontend.
 * There is no About Us API endpoint in the backend collection, so nothing
 * is fetched here. When an endpoint becomes available, replace these
 * constants with data-fetching (e.g. via src/services/*) and keep the
 * same shapes so the UI does not change.
 */

export const aboutHero: {
  label: string;
  title: string;
  description: string;
} = {
  label: "About Us",
  title: "About Sportiva",
  description:
    "Sportiva is a digital platform for sports news and events in Cambodia, providing the latest sports updates, match schedules, and an easy-to-use experience in Khmer.",
};

export const whoWeAre: SectionHeadingData = {
  label: "Who Created It",
  title: "What is Sportiva?",
  description:
    "Sportiva is a sports news and events platform in Cambodia that brings together the latest news, match schedules, and diverse sports content all in one place.",
};

export const whoWeAreHighlights: string[] = [
  "Covers multiple sports: Football, Basketball, Martial Arts, Tennis, and Esports",
  "Search system for sports information and sorting by sport category",
  "Displays sports events and manages content through the admin panel",
];

export const missionSection: SectionHeadingData = {
  label: "Our Mission",
  title: "What We Do",
  description:
    "We strive to make sports information easy to access, clear, and reliable for every sports lover in Cambodia.",
};

export const missionFeatures: FeatureCard[] = [
  {
    icon: Newspaper,
    title: "Sports News",
    description:
      "Providing the latest sports news and analysis articles in the Cambodian context, easily searchable.",
  },
  {
    icon: CalendarDays,
    title: "Sports Events",
    description:
      "Displaying match schedules and sports events taking place locally and internationally.",
  },
  {
    icon: Users,
    title: "Sports Community",
    description:
      "Connecting fans, players, and sports lovers to share and exchange opinions with each other.",
  },
];

export const visionSection: SectionHeadingData = {
  label: "Vision",
  title: "Our Vision",
  description:
    "We envision Sportiva becoming the leading digital sports platform in Cambodia, helping users find sports news and events easily, with a modern Khmer experience accessible to everyone.",
};

export const visionValues: string[] = [
  "Clean and easy-to-use experience",
  "Clear Khmer content",
  "Works on all devices, both desktop and mobile",
];

/**
 * Note: No real platform statistics are available yet, so every value is
 * null and rendered as a neutral placeholder. Map these to a future API
 * response (users, categories, events, articles) without changing the UI.
 */
export const statsSection: {
  heading: SectionHeadingData;
  items: StatItem[];
} = {
  heading: {
    label: "Platform Statistics",
    title: "Sportiva in Numbers",
    description:
      "Real data will be displayed once the API is connected.",
  },
  items: [
    { icon: Users, label: "Users", value: null },
    { icon: Dumbbell, label: "Sports", value: null },
    { icon: CalendarDays, label: "Events", value: null },
    { icon: Newspaper, label: "News Articles", value: null },
  ],
};

/**
 * Placeholder team data (1 Mentor + 6 Team Members). No real team
 * information exists in the project, so names/images/links are clearly
 * marked as placeholders and should be replaced with real data when it
 * becomes available. `image` is `null` on every entry for now.
 */
export const teamSection: {
  heading: SectionHeadingData;
  mentor: TeamMember;
  members: TeamMember[];
} = {
  heading: {
    label: "Our Team",
    title: "The Team Behind Sportiva",
    description:
      "A team of sports and technology enthusiasts who are building Sportiva.",
  },
  mentor: {
    id: "team-mentor",
    name: "Sokcheat Srorng",
    role: "Mentor",
    image: "/mentor.jpg",
    isPlaceholder: false,
    socials: [],
  },
  members: [
    {
      id: "team-member-1",
      name: "Ngin Chakreya",
      role: "Team Member",
      image: "/Ngin_Chakreya.jpg",
      isPlaceholder: false,
      socials: [],
    },
    {
      id: "team-member-2",
      name: "LONG Baung",
      role: "Team Member",
      image: "/Long_Baung.jpg",
      isPlaceholder: false,
      socials: [],
    },
    {
      id: "team-member-3",
      name: "Sakhom SovannChayy",
      role: "Team Member",
      image: "/Sakhom_SovannChayy.jpg",
      isPlaceholder: false,
      socials: [],
    },
    {
      id: "team-member-4",
      name: "Chhun Heng",
      role: "Team Member",
      image: "/Chhun_Heng.jpg",
      isPlaceholder: false,
      socials: [],
    },
    {
      id: "team-member-5",
      name: "Ly Soketya",
      role: "Team Member",
      image: "/Ly_Soketya.jpg",
      isPlaceholder: false,
      socials: [],
    },
    {
      id: "team-member-6",
      name: "Member name",
      role: "Team Member",
      image: null,
      isPlaceholder: true,
      socials: [],
    },
  ],
};

/**
 * Generic organization structure using neutral labels only (no real names).
 */
export const organizationSection: {
  heading: SectionHeadingData;
  lead: string;
  departments: OrgDepartment[];
} = {
  heading: {
    label: "Team Structure",
    title: "How We Work",
    description:
      "A small team working together on every part of the platform.",
  },
  lead: "Project Lead",
  departments: [
    {
      icon: Code,
      title: "Development",
      description: "Building and maintaining the system",
      members: ["Frontend Developer", "Backend Developer"],
    },
    {
      icon: Palette,
      title: "Design",
      description: "User experience and interface",
      members: ["UI/UX Designer"],
    },
    {
      icon: PenTool,
      title: "Content",
      description: "News, articles, and social media",
      members: ["Article Writer", "Social Media Manager"],
    },
  ],
};

export const whySportiva: {
  heading: SectionHeadingData;
  cards: WhyCard[];
} = {
  heading: {
    label: "Why Sportiva?",
    title: "Why Choose Us",
    description:
      "Core values that define the Sportiva experience for users.",
  },
  cards: [
    {
      icon: Search,
      title: "Easy access to sports information",
      description:
        "Search and read sports news quickly, all in one place.",
    },
    {
      icon: CalendarDays,
      title: "Discover sports events",
      description:
        "Find schedules and detailed information of sports matches.",
    },
    {
      icon: Languages,
      title: "Khmer language experience",
      description:
        "All content is displayed in Khmer, easy to understand and read for everyone.",
    },
    {
      icon: Users,
      title: "A modern sports community",
      description:
        "A lively digital community of sports lovers on the platform.",
    },
  ],
};

export const contactSection: {
  heading: SectionHeadingData;
  info: ContactInfoItem[];
} = {
  heading: {
    label: "Contact",
    title: "Get in Touch",
    description:
      "Have a question or feedback for Sportiva? Send us a message using the form below.",
  },
  info: [
    {
      icon: Mail,
      label: "Email",
      value: "contact@sportiva.example",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+855 00 000 000",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kingdom of Cambodia",
    },
  ],
};

export const aboutFooterLinks: { label: string; href: string }[] = [
  { label: "Sports", href: "/sports" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "About Us", href: "/about" },
];

export const aboutFooterCapabilities: string[] = [
  "Latest sports news",
  "Sports events",
  "Khmer language experience",
];