import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen text-primary",
        className
      )}
    >
     <Spinner variant="bars" /> 
    </div>
  );
}