import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Radio } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(createPageUrl("Legislacao") + `?busca=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden" aria-label="Seção principal">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
      </div>

      {/* Architectural Grid Overlay */}
      <div className="absolute inset-0 architectural-grid opacity-10" aria-hidden="true" />

      {/* Status Blade - Left */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-16 md:w-20 glass-dark flex flex-col items-center justify-center"
        aria-label="Status da sessão"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Radio className="w-5 h-5 text-accent" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
          </div>
          <div className="writing-mode-vertical text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary-foreground/80"
               style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            SESSÃO EM RECESSO
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pl-24 md:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-accent font-body text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Câmara Municipal
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[0.95] mb-6">
            PRESIDENTE
            <br />
            <span className="text-primary-foreground/30 font-display" style={{ WebkitTextStroke: '1px hsl(var(--primary-foreground))' }}>
              MÉDICI
            </span>
          </h1>
          <p className="text-primary-foreground/70 font-body text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Portal oficial do Poder Legislativo Municipal. Transparência, 
            participação cidadã e acesso à informação.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl">
            <div className="glass rounded-lg flex items-center">
              <Search className="w-5 h-5 text-muted-foreground ml-5 shrink-0" />
              <Input
                type="text"
                placeholder="Buscar leis, decretos ou dados de transparência..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent h-14 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 text-base"
                aria-label="Buscar no portal"
              />
              <button
                type="submit"
                className="bg-accent text-accent-foreground h-10 px-6 rounded-md mr-2 font-body text-sm font-semibold hover:bg-accent/90 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Overflow title on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden="true">
        <div className="font-display text-[12rem] font-bold text-primary-foreground/5 leading-none select-none translate-x-1/4">
          PM
        </div>
      </div>
    </section>
  );
}