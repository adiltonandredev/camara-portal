import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Search, FileText, Filter, ExternalLink, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Footer from "../components/home/Footer";

const tipoLabels = {
  lei_ordinaria: "Lei Ordinária",
  lei_complementar: "Lei Complementar",
  decreto: "Decreto",
  resolucao: "Resolução",
  emenda: "Emenda",
  lei_organica: "Lei Orgânica",
};

export default function Legislacao() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get("busca") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [tipoFilter, setTipoFilter] = useState("all");
  const [situacaoFilter, setSituacaoFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const { data: leis, isLoading } = useQuery({
    queryKey: ["legislacao"],
    queryFn: () => base44.entities.Legislacao.list("-data_publicacao", 100),
    initialData: [],
  });

  const filteredLeis = useMemo(() => {
    return leis.filter((lei) => {
      const matchSearch = !searchQuery || 
        lei.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lei.numero?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lei.ementa?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTipo = tipoFilter === "all" || lei.tipo === tipoFilter;
      const matchSituacao = situacaoFilter === "all" || lei.situacao === situacaoFilter;
      return matchSearch && matchTipo && matchSituacao;
    });
  }, [leis, searchQuery, tipoFilter, situacaoFilter]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Processo Legislativo
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Legislação Municipal
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl">
            Consulte as leis ordinárias, complementares, decretos e demais normas do município.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, número ou ementa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                aria-label="Buscar legislação"
              />
            </div>
            <div className="flex gap-3">
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-44 h-12" aria-label="Filtrar por tipo">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {Object.entries(tipoLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={situacaoFilter} onValueChange={setSituacaoFilter}>
                <SelectTrigger className="w-40 h-12" aria-label="Filtrar por situação">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="vigente">Vigente</SelectItem>
                  <SelectItem value="revogada">Revogada</SelectItem>
                  <SelectItem value="em_tramitacao">Em Tramitação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <p className="text-sm text-muted-foreground mb-6">
          {filteredLeis.length} {filteredLeis.length === 1 ? "resultado" : "resultados"} encontrados
        </p>

        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredLeis.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nenhuma legislação encontrada
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeis.map((lei, index) => (
              <motion.div
                key={lei.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <div
                  className="group bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setExpandedId(expandedId === lei.id ? null : lei.id)}
                >
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-colors" />
                    <div className="p-6 pl-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary text-xs">
                              {tipoLabels[lei.tipo] || lei.tipo}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Nº {lei.numero}</span>
                            {lei.data_publicacao && (
                              <span className="text-xs text-muted-foreground">
                                · {format(new Date(lei.data_publicacao), "dd/MM/yyyy")}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {lei.titulo}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge className={`${
                            lei.situacao === "vigente"
                              ? "bg-accent/10 text-accent border-accent/20"
                              : lei.situacao === "revogada"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-muted text-muted-foreground border-border"
                          } border`}>
                            {lei.situacao === "vigente" ? "Vigente" : lei.situacao === "revogada" ? "Revogada" : "Em Tramitação"}
                          </Badge>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedId === lei.id ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {expandedId === lei.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          {lei.ementa && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Ementa</p>
                              <p className="text-sm text-foreground leading-relaxed">{lei.ementa}</p>
                            </div>
                          )}
                          {lei.arquivo_url && (
                            <a
                              href={lei.arquivo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Abrir Documento
                            </a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}