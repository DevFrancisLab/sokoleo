import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "fixed bottom-28 right-6 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-secondary shadow-glow hover:scale-105 active:scale-95"
      )}
      aria-label="Open Chat"
    >
      <span className={cn("absolute inset-0 rounded-full bg-secondary/40 animate-voice-pulse")} />
      <span className={cn("absolute inset-0 rounded-full bg-secondary/20 animate-voice-pulse")} style={{ animationDelay: "0.5s" }} />
      <MessageCircle className={cn("w-10 h-10 text-secondary-foreground relative z-10 transition-transform", isOpen && "animate-gentle-bounce")} />
    </button>
  );
};

export default FloatingChatButton;
