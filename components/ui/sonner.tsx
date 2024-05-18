"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      toastOptions={{
        classNames: {
          toast:
            "group shadcn-toast group-[.shadcn-toaster]:bg-background group-[.shadcn-toaster]:text-foreground group-[.shadcn-toaster]:border-border group-[.shadcn-toaster]:shadow-lg",
          description: "group-[.shadcn-toast]:text-muted-foreground",
          actionButton:
            "group-[.shadcn-toast]:bg-primary group-[.shadcn-toast]:text-primary-foreground",
          cancelButton:
            "group-[.shadcn-toast]:bg-muted group-[.shadcn-toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
