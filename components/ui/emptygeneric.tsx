import Image from "next/image";

type EmptyProps = {
  label: string;
};

export const EmptyGeneric = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">

      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
