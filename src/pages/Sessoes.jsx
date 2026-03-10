import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, FileText, Radio, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Footer from "../components/home/Footer";

const tipoLabels = {
  ordinaria: "Ordinária",
  extraordinaria: "Extraordinária",
  solene: "Solene",
  audiencia_publica: "Audiência Pública",
};

const statusConfig = {
  agendada: { label: "Agendada", class: "bg-accent/10 text-accent border-accent/20" },
  em_andamento: { label: "Ao Vivo", class: "bg-destructive/10 text-destructive border-destructive/20" },
  encerrada: { label: "Encerrada", class: "bg-muted text-muted-foreground border-border" },
};

export default function Sessoes() {
  const [tipoFilter, setTipoFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: sessoes, isLoading } = useQuery({
    queryKey: ["sessoes"],
    queryFn: () => base44.entities.SessaoPlenaria.list("-data_sessao", 50),
    initialData: [],
  });

  const filtered = sessoes.filter((s) => {
    const matchTipo = tipoFilter === "all" || s.tipo === tipoFilter;
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchTipo && matchStatus;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Plenário
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Sessões Plenárias
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl">
            Acompanhe o calendário das sessões ordinárias, extraordinárias e audiências públicas.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-wrap gap-4">
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-44 h-11" aria-label="Filtrar por tipo">
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-11" aria-label="Filtrar por status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="em_andamento">Ao Vivo</SelectItem>
              <SelectItem value="encerrada">Encerrada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nenhuma sessão encontrada
            </h3>
            <p className="text-muted-foreground">Ajuste os filtros para ver os resultados.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((sessao, index) => {
              const config = statusConfig[sessao.status] || statusConfig.agendada;
              return (
                <motion.div
                  key={sessao.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    {sessao.status === "em_andamento" && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive animate-pulse" />
                    )}
                    <div className="p-6 pl-8 flex flex-col md:flex-row md:items-center gap-4">
                      {/* Date */}
                      <div className="shrink-0 w-20 text-center">
                        {sessao.data_sessao && (
                          <>
                            <p className="font-display text-3xl font-bold text-foreground">
                              {format(new Date(sessao.data_sessao), "dd")}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase">
                              {format(new Date(sessao.data_sessao), "MMM yyyy", { locale: ptBR })}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="h-12 w-px bg-border hidden md:block" />

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="secondary" className="bg-primary/5 text-primary text-xs">
                            {tipoLabels[sessao.tipo] || sessao.tipo}
                          </Badge>
                          <Badge className={`${config.class} border text-xs`}>
                            {sessao.status === "em_andamento" && (
                              <Radio className="w-3 h-3 mr-1" />
                            )}
                            {config.label}
                          </Badge>
                          {sessao.data_sessao && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {format(new Date(sessao.data_sessao), "HH:mm")}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {sessao.titulo}
                        </h3>
                        {sessao.pauta && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{sessao.pauta}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {sessao.video_url && (
                          <a href={sessao.video_url} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 rounded-md bg-muted hover:bg-accent/10 transition-colors"
                            aria-label="Assistir vídeo">
                            <Video className="w-4 h-4 text-muted-foreground" />
                          </a>
                        )}
                        {sessao.ata_url && (
                          <a href={sessao.ata_url} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 rounded-md bg-muted hover:bg-accent/10 transition-colors"
                            aria-label="Ver ata">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}