import React from "react";
import HeroSection from "../components/home/HeroSection";
import SessionStatusBar from "../components/home/SessionStatusBar";
import QuickAccessGrid from "../components/home/QuickAccessGrid";
import RecentLaws from "../components/home/RecentLaws";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SessionStatusBar />
      <QuickAccessGrid />
      <RecentLaws />
      <NewsSection />
      <Footer />
    </div>
  );
}