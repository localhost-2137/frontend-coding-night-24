import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Wrapper({className, children}: {className?: string, children: ReactNode}): JSX.Element {
  return (
    <div className={cn(className, "w-full h-full border-4 border-gray-800 rounded-xl bg-black/80 shadow-gray-800/60 text-white shadow-md")}>
      {children}
    </div>
  );
}