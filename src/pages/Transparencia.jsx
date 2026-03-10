import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  DollarSign,
  FileText,
  Users,
  Briefcase,
  Building,
  ExternalLink,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import Footer from "../components/home/Footer";

const transparencyLinks = [
  {
    icon: DollarSign,
    title: "Receitas e Despesas",
    description: "Acompanhe a execução orçamentária e financeira da Câmara Municipal.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "Servidores e Remunerações",
    description: "Consulte os servidores públicos e suas respectivas remunerações.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Briefcase,
    title: "Licitações e Contratos",
    description: "Processos licitatórios, contratos e atas de registro de preços.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: FileText,
    title: "Diárias e Passagens",
    description: "Valores de diárias e passagens concedidas aos servidores.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Building,
    title: "Patrimônio",
    description: "Bens móveis e imóveis pertencentes à Câmara Municipal.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BarChart3,
    title: "Relatórios de Gestão",
    description: "Relatórios anuais de gestão e prestação de contas.",
    color: "bg-secondary/10 text-secondary",
  },
];

const externalPortals = [
  { name: "Portal da Transparência Nacional", url: "https://portaldatransparencia.gov.br" },
  { name: "e-SIC - Sistema de Informação ao Cidadão", url: "https://esic.cgu.gov.br" },
  { name: "e-OUV - Ouvidoria", url: "https://falabr.cgu.gov.br" },
  { name: "Radar da Transparência Pública", url: "https://radar.tce.mt.gov.br" },
];

export default function Transparencia() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-primary text-primary-foreground py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-5" aria-hidden="true" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-accent" />
            <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase">
              Acesso à Informação
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Portal da
            <br />
            <span className="text-accent">Transparência</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl leading-relaxed">
            Em cumprimento à Lei de Acesso à Informação (Lei nº 12.527/2011), 
            a Câmara Municipal disponibiliza informações de interesse público.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transparencyLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${link.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {link.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* External Portals */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Portais Externos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalPortals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {portal.name}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}