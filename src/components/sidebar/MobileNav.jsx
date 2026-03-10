import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home,
  ScrollText,
  Users,
  Newspaper,
  Eye,
  Menu,
  X,
  Calendar,
  Landmark,
  Phone,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

export default function MobileNav({ currentPageName }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-sidebar-primary" />
          <span className="font-display text-sm font-semibold text-sidebar-foreground">
            CÂMARA MUNICIPAL
          </span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground" aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-sidebar border-sidebar-border w-72 p-0">
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <Scale className="w-7 h-7 text-sidebar-primary" />
                <div>
                  <p className="font-display text-sm font-bold text-sidebar-foreground">CÂMARA MUNICIPAL</p>
                  <p className="text-xs text-sidebar-foreground/60">Presidente Médici - RO</p>
                </div>
              </div>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label="Menu de navegação">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                      ${isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}