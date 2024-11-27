"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

import { Empty } from "@/components/ui/empty";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});



export const SideMessage = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-orange-700/10 text-white">
      <div className="px-3 py-2 flex-1">
      <Empty label="Sin mensajes guardados." />

        {/* <div className="space-y-1">
          {ROUTES.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div> */}
      </div>

    </div>
  );
};
