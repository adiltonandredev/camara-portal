import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Eye,
  FileText,
  Users,
  Calendar,
  Headphones,
  Scale,
  BookOpen,
  MessageSquare
} from "lucide-react";

const quickLinks = [
  {
    icon: Eye,
    title: "Portal da Transparência",
    description: "Receitas, despesas e contratos públicos",
    page: "Transparencia",
    color: "bg-primary/5 text-primary hover:bg-primary/10"
  },
  {
    icon: FileText,
    title: "Legislação Municipal",
    description: "Leis ordinárias, complementares e decretos",
    page: "Legislacao",
    color: "bg-accent/5 text-accent hover:bg-accent/10"
  },
  {
    icon: Users,
    title: "Nossos Parlamentares",
    description: "Conheça os vereadores da legislatura atual",
    page: "Parlamentares",
    color: "bg-secondary/5 text-secondary hover:bg-secondary/10"
  },
  {
    icon: Calendar,
    title: "Sessões Plenárias",
    description: "Calendário e atas das sessões",
    page: "Sessoes",
    color: "bg-primary/5 text-primary hover:bg-primary/10"
  },
  {
    icon: BookOpen,
    title: "Lei Orgânica",
    description: "Constituição do município",
    page: "Legislacao",
    color: "bg-accent/5 text-accent hover:bg-accent/10"
  },
  {
    icon: MessageSquare,
    title: "Ouvidoria",
    description: "Canal direto com a Câmara Municipal",
    page: "Contato",
    color: "bg-secondary/5 text-secondary hover:bg-secondary/10"
  },
];

export default function QuickAccessGrid() {
  return (
    <section className="py-20 px-6 md:px-12" aria-label="Acesso rápido">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Serviços
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Acesso Rápido
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  to={createPageUrl(link.page)}
                  className="group flex items-start gap-5 p-6 bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 transition-colors ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}