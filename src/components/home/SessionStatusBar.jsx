import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Radio, FileText, Users } from "lucide-react";

const stats = [
  { icon: FileText, label: "Leis Aprovadas", value: "47", suffix: "em 2025" },
  { icon: Calendar, label: "Sessões Realizadas", value: "38", suffix: "ordinárias" },
  { icon: Users, label: "Vereadores", value: "9", suffix: "ativos" },
  { icon: Clock, label: "Próxima Sessão", value: "17 Mar", suffix: "2026" },
];

export default function SessionStatusBar() {
  return (
    <section className="w-full bg-card border-y border-border" aria-label="Estatísticas legislativas">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 py-8 px-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.label} <span className="text-muted-foreground/50">· {stat.suffix}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}