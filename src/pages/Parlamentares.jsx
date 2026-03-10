import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "../components/home/Footer";

const cargoLabels = {
  presidente: "Presidente",
  vice_presidente: "Vice-Presidente",
  primeiro_secretario: "1º Secretário",
  segundo_secretario: "2ª Secretária",
  vereador: "Vereador(a)",
};

const cargoOrder = ["presidente", "vice_presidente", "primeiro_secretario", "segundo_secretario", "vereador"];

export default function Parlamentares() {
  const { data: vereadores, isLoading } = useQuery({
    queryKey: ["vereadores"],
    queryFn: () => base44.entities.Vereador.list("nome", 50),
    initialData: [],
  });

  const sortedVereadores = [...vereadores].sort((a, b) => {
    const orderA = cargoOrder.indexOf(a.cargo || "vereador");
    const orderB = cargoOrder.indexOf(b.cargo || "vereador");
    return orderA - orderB;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Legislatura 2025–2028
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nossos Parlamentares
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl">
            Conheça os vereadores que representam o município de Presidente Médici.
          </p>
        </div>
      </div>

      {/* Mesa Diretora */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16" aria-label="Mesa Diretora">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Mesa Diretora</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedVereadores.filter(v => v.cargo && v.cargo !== "vereador").map((vereador, index) => (
              <motion.div
                key={vereador.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  {vereador.foto_url ? (
                    <img
                      src={vereador.foto_url}
                      alt={vereador.nome}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent h-20" />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-accent/10 text-accent mb-2">
                    {cargoLabels[vereador.cargo]}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {vereador.nome}
                  </h3>
                  {vereador.partido && (
                    <p className="text-sm text-muted-foreground">{vereador.partido}</p>
                  )}
                  <div className="flex gap-3 mt-4">
                    {vereador.email && (
                      <a href={`mailto:${vereador.email}`} className="p-2 rounded-md bg-muted hover:bg-accent/10 transition-colors" aria-label={`Email de ${vereador.nome}`}>
                        <Mail className="w-4 h-4 text-muted-foreground" />
                      </a>
                    )}
                    {vereador.telefone && (
                      <a href={`tel:${vereador.telefone}`} className="p-2 rounded-md bg-muted hover:bg-accent/10 transition-colors" aria-label={`Telefone de ${vereador.nome}`}>
                        <Phone className="w-4 h-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Demais Vereadores */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16" aria-label="Demais Vereadores">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Demais Vereadores</h2>

        {!isLoading && sortedVereadores.filter(v => !v.cargo || v.cargo === "vereador").length === 0 && (
          <p className="text-muted-foreground">Nenhum vereador cadastrado.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVereadores.filter(v => !v.cargo || v.cargo === "vereador").map((vereador, index) => (
            <motion.div
              key={vereador.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group flex items-center gap-5 bg-card rounded-lg border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 p-5"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted shrink-0">
                {vereador.foto_url ? (
                  <img src={vereador.foto_url} alt={vereador.nome} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground truncate">
                  {vereador.nome}
                </h3>
                {vereador.partido && (
                  <p className="text-sm text-muted-foreground">{vereador.partido}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}