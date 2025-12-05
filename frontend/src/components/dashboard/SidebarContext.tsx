import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed((s) => !s);
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle, setCollapsed: setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export default SidebarContext;
