"use client";

import { useAuth } from "@clerk/nextjs";
import { Github } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/constants";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src="/logo.png" alt={`${SITE_NAME} logo`} fill />
        </div>

        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          {SITE_NAME}
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>Comienza ahora</Link>
        </Button>


      </div>
    </nav>
  );
};
