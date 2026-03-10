import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  ScrollText,
  Users,
  Calendar,
  Newspaper,
  Search,
  Eye,
  FileText,
  Building2,
  Phone,
  Scale,
  Home,
  ChevronRight
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Início", page: "Home" },
  { icon: Landmark, label: "A Câmara", page: "SobreCamara" },
  { icon: Users, label: "Parlamentares", page: "Parlamentares" },
  { icon: ScrollText, label: "Legislação", page: "Legislacao" },
  { icon: Calendar, label: "Sessões", page: "Sessoes" },
  { icon: Newspaper, label: "Notícias", page: "Noticias" },
  { icon: Eye, label: "Transparência", page: "Transparencia" },
  { icon: Phone, label: "Contato", page: "Contato" },
];

export default function SidebarNav({ currentPageName }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      className="fixed left-0 top-0 h-full z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300"
      style={{ width: expanded ? 220 : 68 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setHoveredItem(null); }}
      aria-label="Navegação principal"
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-sidebar-border px-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <Scale className="w-7 h-7 text-sidebar-primary shrink-0" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-display text-sm font-semibold text-sidebar-foreground whitespace-nowrap overflow-hidden"
              >
                CÂMARA<br />MUNICIPAL
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-1 py-4 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPageName === item.page;
          return (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`
                relative flex items-center gap-3 px-3 py-3 rounded-md
                transition-all duration-200 group
                ${isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }
              `}
              onMouseEnter={() => setHoveredItem(item.page)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-sidebar-primary rounded-r" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!expanded && hoveredItem === item.page && (
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap shadow-lg z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Expand indicator */}
      <div className="p-4 border-t border-sidebar-border flex items-center justify-center">
        <ChevronRight
          className={`w-4 h-4 text-sidebar-foreground/40 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </div>
    </nav>
  );
}