import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, ArrowLeft } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-bold text-primary/10 mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-foreground mb-3">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground mb-8">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}