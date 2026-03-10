import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

const categoriaLabels = {
  sessao: "Sessão",
  audiencia_publica: "Audiência Pública",
  legislacao: "Legislação",
  institucional: "Institucional",
  evento: "Evento",
};

export default function NewsSection() {
  const { data: noticias, isLoading } = useQuery({
    queryKey: ["noticias-recentes"],
    queryFn: () => base44.entities.Noticia.list("-data_publicacao", 4),
    initialData: [],
  });

  return (
    <section className="py-20 px-6 md:px-12 bg-muted/30" aria-label="Últimas notícias">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Informação Cidadã
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Últimas Notícias
            </h2>
          </div>
          <Link
            to={createPageUrl("Noticias")}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group"
          >
            Todas as notícias
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden border border-border">
                <Skeleton className="w-full h-48" />
                <div className="p-5">
                  <Skeleton className="h-3 w-20 mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : noticias.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>Nenhuma notícia publicada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {noticias.map((noticia, index) => (
              <motion.article
                key={noticia.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={noticia.imagem_url || "https://images.unsplash.com/photo-1569025743873-ea3a9ber544f?w=600&q=80"}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  {noticia.categoria && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold bg-accent text-accent-foreground">
                      {categoriaLabels[noticia.categoria] || noticia.categoria}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {noticia.data_publicacao && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <CalendarIcon className="w-3 h-3" />
                      {format(new Date(noticia.data_publicacao), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </div>
                  )}
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {noticia.titulo}
                  </h3>
                  {noticia.resumo && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {noticia.resumo}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}