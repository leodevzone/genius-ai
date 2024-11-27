import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface ClientSideWrapperProps {
  children: (props: { isSpecificPage: boolean }) => React.ReactNode;
}

const ClientSideWrapper: React.FC<ClientSideWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isSpecificPage, setIsSpecificPage] = useState(false);

  useEffect(() => {
    setIsSpecificPage(pathname === "/conversation"); // Cambia esta ruta según tu necesidad
  }, [pathname]);

  return <>{children({ isSpecificPage })}</>;
};

export default ClientSideWrapper;
