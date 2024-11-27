import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { SideMessage } from "@/components/sidemessage";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import ClientSideWrapper from "@/components/ClientSideWrapper";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      {/* Barra lateral izquierda */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>

      {/* Contenido principal */}
      <main className="flex-1 md:ml-72">
        <Navbar />
        <ClientSideWrapper>
          {({ isSpecificPage }) =>
            isSpecificPage ? (
              <div className="flex">
                <div className="flex-1">{children}</div>
                <div className="hidden lg:flex lg:w-72 lg:flex-col bg-gray-100 p-4 border-l">
                  <SideMessage apiLimitCount={apiLimitCount} isPro={isPro} />
                </div>
              </div>
            ) : (
              // Renderiza children normalmente para otras páginas
              <>{children}</>
            )
          }
        </ClientSideWrapper>
      </main>
    </div>
  );
};

export default DashboardLayout;
