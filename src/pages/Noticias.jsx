import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Footer from "../components/home/Footer";

const categoriaLabels = {
  sessao: "Sessão",
  audiencia_publica: "Audiência Pública",
  legislacao: "Legislação",
  institucional: "Institucional",
  evento: "Evento",
};

export default function Noticias() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("all");

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["todas-noticias"],
    queryFn: () => base44.entities.Noticia.list("-data_publicacao", 100),
    initialData: [],
  });

  const filtered = noticias.filter((n) => {
    const matchSearch = !searchQuery ||
      n.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.resumo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoriaFilter === "all" || n.categoria === categoriaFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Imprensa
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Notícias
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl">
            Fique por dentro das atividades legislativas e eventos do município.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
              aria-label="Buscar notícias"
            />
          </div>
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-44 h-11" aria-label="Filtrar por categoria">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {Object.entries(categoriaLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-3 w-24 mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-muted-foreground">Tente ajustar os filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((noticia, index) => (
              <motion.article
                key={noticia.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link to={createPageUrl("NoticiaDetalhe") + `?id=${noticia.id}`}>
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {noticia.imagem_url ? (
                      <img
                        src={noticia.imagem_url}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    {noticia.categoria && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold bg-accent text-accent-foreground">
                        {categoriaLabels[noticia.categoria]}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    {noticia.data_publicacao && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(noticia.data_publicacao), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </div>
                    )}
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {noticia.titulo}
                    </h3>
                    {noticia.resumo && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{noticia.resumo}</p>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}