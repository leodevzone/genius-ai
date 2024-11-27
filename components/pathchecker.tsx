// PathChecker.tsx
"use client";

import { usePathname } from "next/navigation";

const PathChecker = ({ children }: { children: (isSpecificPage: boolean) => React.ReactNode }) => {
  const pathname = usePathname();
  const isSpecificPage = pathname === "/conversation";
  return <>{children(isSpecificPage)}</>;
};

export default PathChecker;
