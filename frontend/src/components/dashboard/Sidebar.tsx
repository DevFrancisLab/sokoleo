import { NavLink } from "react-router-dom";
import { Grid, Zap, Users, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const { isCollapsed, toggle } = useSidebar();

  const links = [
    { to: "/dashboard/markets", label: "Markets", icon: Grid },
    { to: "/dashboard/insights", label: "Insights", icon: Zap },
    { to: "/dashboard/farmers", label: "Farmers", icon: Users },
  ];

  return (
    <aside
      className={`hidden lg:flex fixed left-0 top-0 bottom-0 flex-col pt-4 p-4 bg-card border-r border-border/50 shadow-soft z-30 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      style={{ paddingTop: 0 }}
    >
      <div className="flex items-center justify-between gap-3 mb-6 px-1">
        <div className="flex items-center gap-3">
          <img src="/sokoleologo.png" alt="SokoLeo" className={`object-contain ${isCollapsed ? "w-8 h-8" : "w-10 h-10"}`} />
          {!isCollapsed && (
            <div>
              <div className="text-lg font-bold text-foreground">SokoLeo</div>
              <div className="text-xs text-muted-foreground">AI Market Assistant</div>
            </div>
          )}
        </div>

        <button
          onClick={toggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-1">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-primary-foreground/80 hover:bg-muted"
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                <span className={`font-medium ${isCollapsed ? "hidden" : "inline"}`}>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="mt-6 text-sm text-muted-foreground px-3">
          <p className="mb-2">Signed in as</p>
          <div className="font-medium text-foreground">Dorcas Kagwiria</div>
          <div className="text-xs">Kirinyaga, Kenya</div>
        </div>
      )}

      {/* Sign out button at bottom */}
      <div className="mt-4 px-2 pb-4">
        {isCollapsed ? (
          <button
            onClick={() => {
              try {
                localStorage.removeItem("authToken");
              } catch (e) {
                // ignore
              }
              window.location.href = "/";
            }}
            className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-glow-accent hover:scale-105 transition-transform"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              try {
                localStorage.removeItem("authToken");
              } catch (e) {
                // ignore
              }
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign out</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
