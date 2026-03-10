import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

const tipoLabels = {
  lei_ordinaria: "Lei Ordinária",
  lei_complementar: "Lei Complementar",
  decreto: "Decreto",
  resolucao: "Resolução",
  emenda: "Emenda",
  lei_organica: "Lei Orgânica",
};

export default function RecentLaws() {
  const { data: leis, isLoading } = useQuery({
    queryKey: ["legislacao-recente"],
    queryFn: () => base44.entities.Legislacao.list("-created_date", 5),
    initialData: [],
  });

  return (
    <section className="py-20 px-6 md:px-12" aria-label="Legislação recente">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Transparência Legislativa
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Legislação Recente
            </h2>
          </div>
          <Link
            to={createPageUrl("Legislacao")}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Laws Cards - Vellum Paper Style */}
        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-6 bg-card rounded-lg border border-border">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : leis.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Nenhuma legislação cadastrada ainda.</p>
            </div>
          ) : (
            leis.map((lei, index) => (
              <motion.div
                key={lei.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="group relative bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-colors" />
                  
                  <div className="p-6 pl-8 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex px-2.5 py-0.5 rounded text-xs font-semibold bg-primary/5 text-primary">
                          {tipoLabels[lei.tipo] || lei.tipo}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Nº {lei.numero}
                        </span>
                        {lei.data_publicacao && (
                          <span className="text-xs text-muted-foreground">
                            · {format(new Date(lei.data_publicacao), "dd MMM yyyy", { locale: ptBR })}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {lei.titulo}
                      </h3>
                      {lei.ementa && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {lei.ementa}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        lei.situacao === "vigente"
                          ? "bg-accent/10 text-accent"
                          : lei.situacao === "revogada"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {lei.situacao === "vigente" ? "Vigente" : lei.situacao === "revogada" ? "Revogada" : "Em Tramitação"}
                      </span>
                      {lei.arquivo_url && (
                        <a
                          href={lei.arquivo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md hover:bg-muted transition-colors"
                          aria-label={`Abrir documento da ${lei.titulo}`}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile link */}
        <div className="mt-8 md:hidden text-center">
          <Link
            to={createPageUrl("Legislacao")}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Ver todas as legislações
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}