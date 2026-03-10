import React from "react";
import SidebarNav from "./components/sidebar/SidebarNav";
import MobileNav from "./components/sidebar/MobileNav";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarNav currentPageName={currentPageName} />
      </div>

      {/* Mobile Nav */}
      <MobileNav currentPageName={currentPageName} />

      {/* Main Content */}
      <main className="lg:ml-[68px] pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}