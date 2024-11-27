// ClientWrapper.tsx
import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isSpecificPage, setIsSpecificPage] = useState(false);

  useEffect(() => {
    setIsSpecificPage(pathname === "/conversation"); // Ajusta según la ruta específica
  }, [pathname]);

  return (
    <>
      {isSpecificPage ? (
        <div className="flex">
          <div className="flex-1">{children}</div>
          <div className="hidden lg:flex lg:w-72 lg:flex-col bg-gray-100 p-4 border-l">
            {/* Aquí puedes agregar cualquier contenido adicional específico */}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ClientWrapper;
