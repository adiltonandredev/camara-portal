import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "../components/home/Footer";

const categoriaLabels = {
  sessao: "Sessão",
  audiencia_publica: "Audiência Pública",
  legislacao: "Legislação",
  institucional: "Institucional",
  evento: "Evento",
};

export default function NoticiaDetalhe() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const { data: noticia, isLoading } = useQuery({
    queryKey: ["noticia", id],
    queryFn: async () => {
      const list = await base44.entities.Noticia.filter({ id });
      return list[0] || null;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-64 w-full rounded-lg mb-8" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Notícia não encontrada
          </h1>
          <Link to={createPageUrl("Noticias")} className="text-primary hover:text-accent transition-colors">
            Voltar para notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header image */}
      {noticia.imagem_url && (
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={noticia.imagem_url}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-6 md:px-12 py-12 -mt-20 relative z-10">
        {/* Back link */}
        <Link
          to={createPageUrl("Noticias")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para notícias
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {noticia.categoria && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-accent/10 text-accent">
              <Tag className="w-3 h-3" />
              {categoriaLabels[noticia.categoria]}
            </span>
          )}
          {noticia.data_publicacao && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(noticia.data_publicacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          {noticia.titulo}
        </h1>

        {/* Resumo */}
        {noticia.resumo && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-accent/30 pl-6">
            {noticia.resumo}
          </p>
        )}

        {/* Content */}
        {noticia.conteudo && (
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-foreground leading-relaxed mb-4">{children}</p>,
                h2: ({ children }) => <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="font-display text-xl font-bold text-foreground mt-6 mb-3">{children}</h3>,
              }}
            >
              {noticia.conteudo}
            </ReactMarkdown>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}