import React from "react";
import { motion } from "framer-motion";
import { Landmark, BookOpen, Users, Award, Clock } from "lucide-react";
import Footer from "../components/home/Footer";

const sections = [
  {
    icon: Landmark,
    title: "História",
    content: "A Câmara Municipal de Presidente Médici foi instalada em conformidade com a criação do município, representando o Poder Legislativo local e zelando pela elaboração de leis que atendam às necessidades da população."
  },
  {
    icon: BookOpen,
    title: "Função e Definição",
    content: "A Câmara Municipal é o órgão legislativo do município, composta por vereadores eleitos democraticamente. Sua função principal é legislar, fiscalizar o Poder Executivo e representar os interesses da população."
  },
  {
    icon: Users,
    title: "Estrutura",
    content: "A estrutura organizacional da Câmara é composta pela Mesa Diretora, Comissões Permanentes e Temporárias, Gabinete da Presidência, Secretaria Geral, Assessoria Jurídica e demais setores administrativos."
  },
  {
    icon: Award,
    title: "Regimento Interno",
    content: "O Regimento Interno disciplina a organização, o funcionamento, a polícia e os serviços da Câmara Municipal, estabelecendo as regras para o processo legislativo, as atribuições da Mesa Diretora e o funcionamento das Comissões."
  },
];

const timeline = [
  { year: "1982", event: "Criação do município de Presidente Médici" },
  { year: "1983", event: "Instalação da primeira legislatura" },
  { year: "2001", event: "Aprovação da Lei Orgânica Municipal" },
  { year: "2025", event: "Início da legislatura 2025-2028" },
];

export default function SobreCamara() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-primary text-primary-foreground py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-5" aria-hidden="true" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Institucional
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            A Câmara
            <br />
            <span className="text-primary-foreground/30">Municipal</span>
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl leading-relaxed">
            Poder Legislativo do Município de Presidente Médici, Estado de Rondônia. 
            Compromisso com a transparência, democracia e o bem-estar da população.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg border border-border p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-muted/30 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12">
            Linha do Tempo
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="hidden md:block flex-1" />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 bg-card rounded-lg border border-border p-6">
                    <p className="font-display text-2xl font-bold text-accent mb-1">{item.year}</p>
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}