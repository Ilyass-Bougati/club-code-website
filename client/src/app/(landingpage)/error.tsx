"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-2xl font-bold mb-2">Something went wrong 🚨</h2>
      <p className="text-muted-foreground mb-6">
        We couldn’t load the news right now.  
        Please try again later.
      </p>
      <Button
        variant="default"
        onClick={() => reset()}
      >
        Try Again
      </Button>
    </div>
  );
}
