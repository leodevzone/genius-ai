// PathChecker.tsx
"use client";

import { usePathname } from "next/navigation";

const PathChecker = () => {
  const pathname = usePathname();
  return pathname === "/conversation";
};

export default PathChecker;
