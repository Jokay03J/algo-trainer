import * as React from "react";

import { cn } from "@/libs/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fitContent?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, fitContent = false, ...props }, ref) => {
    const [scrollHeight, setScrollHeight] = React.useState(150);
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={
          fitContent ? { height: scrollHeight, overflow: "hidden" } : undefined
        }
        onInput={(e) =>
          fitContent && setScrollHeight(e.currentTarget.scrollHeight)
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
