import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import dynamic from "next/dynamic";
import { PathChecker } from "@/components/PathChecker"; 

const PathChecker = dynamic(() => import("@/components/PathChecker"), {
  ssr: false, // Asegura que el componente solo se ejecute en el cliente
});

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const isSpecificPage = PathChecker();

  return (
    <div className="h-full flex relative">
      {/* Barra lateral izquierda */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>

      {/* Contenido principal */}
      <main className={`flex-1 md:ml-72 ${isSpecificPage ? "md:mr-72" : ""}`}>
        <Navbar />
        {children}
      </main>

      {/* Barra lateral derecha condicional */}
      {isSpecificPage && (
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 right-0 bg-gray-100">
          <SideMessage apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
