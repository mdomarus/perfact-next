import { ReactNode } from "react";

const TypographyH1 = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="mb-12 text-center text-2xl font-bold text-balance md:text-left md:text-4xl md:leading-none lg:text-5xl lg:leading-tight">
      {children}
    </h1>
  );
};

export default TypographyH1;
