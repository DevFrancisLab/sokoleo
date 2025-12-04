import React, { createContext, useContext, useState } from "react";

type VoiceContextType = {
  isListening: boolean;
  setIsListening: (v: boolean) => void;
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  return <VoiceContext.Provider value={{ isListening, setIsListening }}>{children}</VoiceContext.Provider>;
};

export const useVoice = () => {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
};

export default VoiceContext;
