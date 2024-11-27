import type { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { SideMessage } from "@/components/sidemessage";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { useRouter } from 'next/router';

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  
  // Renderizamos el componente en el cliente, donde se verifica la ruta
  const router = useRouter();
  const isSpecificPage = router.pathname === "/conversation"; // Ajusta la ruta según sea necesario

  return (
    <div className="h-full flex relative">
      {/* Barra lateral izquierda */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      
      {/* Barra lateral derecha condicional */}
      {isSpecificPage && (
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 right-0 bg-gray-100">
          <SideMessage apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
      )}

      {/* Contenido principal */}
      <main className={`flex-1 md:ml-72 ${isSpecificPage ? 'md:mr-72' : ''}`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
