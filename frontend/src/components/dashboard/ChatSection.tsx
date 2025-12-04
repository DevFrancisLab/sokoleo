import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ChatSection = () => {
  const [message, setMessage] = useState("");

  return (
    <section className="bg-card rounded-3xl shadow-soft p-5 border border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Ask Anything</h2>
          <p className="text-sm text-muted-foreground">Use Voice or Type</p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-base text-foreground">Hello! I can help you find the best market today. Just ask me!</p>
            <p className="text-xs text-muted-foreground mt-2">AI Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Speak or Type..."
            className="w-full h-14 px-5 rounded-2xl bg-muted border-2 border-transparent focus:border-primary/50 focus:outline-none text-lg placeholder:text-muted-foreground/60 transition-colors"
          />
        </div>
        <Button size="icon" className="w-14 h-14 rounded-2xl bg-primary hover:bg-primary/90">
          <Send className="w-6 h-6 text-primary-foreground" />
        </Button>
      </div>
    </section>
  );
};

export default ChatSection;
