import {
  Code,
  Facebook,
  Github,
  ImageIcon,
  Instagram,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Twitter,
  VideoIcon,
} from "lucide-react";

export const SITE_NAME = "Simon-ai";

export const MAX_FREE_COUNTS = 5 as const;

export const TESTIMONIALS = [
  {
    name: "Carlos",
    image: "/testimonials/user-1.jpeg",
    title: "Especialista de Marketing",
    description:
      "Esta aplicación ha impulsado significativamente nuestros esfuerzos de marketing.",
  },
  {
    name: "Emilia",
    image: "/testimonials/user-2.jpeg",
    title: "Gerente general",
    description:
      "Esta aplicación me ha salvado la vida a la hora de organizar mis tareas y horarios.",
  },
  {
    name: "David",
    image: "/testimonials/user-3.jpeg",
    title: "Emprendedor",
    description:
      "La eficacia y fiabilidad de esta herramienta son incomparables. Muy recomendable.",
  },
  {
    name: "Sophia",
    image: "/testimonials/user-4.jpeg",
    title: "GDirector de TI",
    description: "Funciones increíbles y diseño fácil de usar. Me encanta.",
  },
] as const;
export const CAPABILITIES_TITLE = "La mejor herramienta de IA para" as const;
export const CAPABILITIES_FOOTER = "Acelere su negocio usando IA 10x más rápido." as const;
export const CAPABILITIES_TOOLS = [
  "Potenciar tus ideas.",
  "Creación de contenido.",
  "Descubrimiento de insights.",
  "Identificar estrategias.",
  "Innovación disruptiva.",
] as const;

export const CAPABILITIES = {
  title: "La mejor herramienta de IA para",
  footer: "Acelera tu negocio 10x más rápido, usando IA.",
  tools: [
    "Potenciar tus ideas.",
    "Creación de contenido.",
    "Descubrimiento de insights.",
    "Identificar estrategias.",
    "Innovación disruptiva.",
  ],
} as const;
export const ACCESS = {
  title: "Pruebalo gratis",
  footer: "No se requiere Tarjeta",
} as const;

export const TOOLS = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-violet-500/10",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
] as const;

export const ROUTES = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  ...TOOLS,
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: null,
  },
] as const;

export const FOOTER_LINKS = [
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com",
  },
];