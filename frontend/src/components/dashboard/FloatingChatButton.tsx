import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-28 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-secondary shadow-glow hover:scale-105 active:scale-95"
      )}
      aria-label="Open Chat"
    >
      <span className={cn("absolute inset-0 rounded-full bg-secondary/40 animate-voice-pulse")} />
      <span className={cn("absolute inset-0 rounded-full bg-secondary/20 animate-voice-pulse")} style={{ animationDelay: "0.5s" }} />
      <MessageCircle className={cn("w-10 h-10 text-secondary-foreground relative z-10 transition-transform")} />
    </button>
  );
};

export default FloatingChatButton;
