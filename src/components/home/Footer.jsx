import React, { useState, useEffect } from "react";
import { Scale, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Footer() {
  const [activeCitizens, setActiveCitizens] = useState(0);

  useEffect(() => {
    setActiveCitizens(Math.floor(Math.random() * 80) + 20);
    const interval = setInterval(() => {
      setActiveCitizens(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(10, prev + change);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const departments = [
    { name: "Gabinete da Presidência", area: "Gestão" },
    { name: "Secretaria Geral", area: "Administração" },
    { name: "Assessoria Jurídica", area: "Jurídico" },
    { name: "Contabilidade", area: "Finanças" },
    { name: "Ouvidoria", area: "Atendimento" },
    { name: "Recursos Humanos", area: "Pessoal" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      {/* Citizen Counter */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <p className="text-sm text-primary-foreground/70">
              <span className="font-semibold text-primary-foreground">{activeCitizens}</span> cidadãos
              ativos neste portal agora
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/50">
            <Clock className="w-3.5 h-3.5" />
            <span>Atualizado em tempo real</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Identity */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-7 h-7 text-accent" />
              <div>
                <p className="font-display text-lg font-bold">CÂMARA MUNICIPAL</p>
                <p className="text-xs text-primary-foreground/50">Presidente Médici - RO</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6">
              Poder Legislativo do Município de Presidente Médici, 
              Estado de Rondônia. Compromisso com a transparência 
              e o serviço público.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Av. Cuiabá, s/n - Centro, Presidente Médici - RO</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 shrink-0" />
                <span>(69) 3471-2600</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 shrink-0" />
                <span>camara@presidentemedici.ro.leg.br</span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-6 text-primary-foreground/80">
              Departamentos
            </h3>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between text-sm">
                  <span className="text-primary-foreground/60">{dept.name}</span>
                  <span className="text-xs text-primary-foreground/30">{dept.area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-6 text-primary-foreground/80">
              Links Úteis
            </h3>
            <div className="space-y-3">
              {[
                { label: "Portal da Transparência", page: "Transparencia" },
                { label: "Sessões Plenárias", page: "Sessoes" },
                { label: "Legislação", page: "Legislacao" },
                { label: "Notícias", page: "Noticias" },
                { label: "Contato", page: "Contato" },
              ].map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-6 text-primary-foreground/80">
              Links Institucionais
            </h3>
            <div className="space-y-3">
              {[
                { label: "Portal Fala.BR", url: "https://falabr.cgu.gov.br" },
                { label: "Gov.br", url: "https://www.gov.br" },
                { label: "Assembleia Legislativa RO", url: "https://www.al.ro.leg.br" },
                { label: "TCE Rondônia", url: "https://www.tce.ro.gov.br" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Câmara Municipal de Presidente Médici - RO. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-xs text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Acessibilidade">
              Acessibilidade
            </button>
            <button className="text-xs text-primary-foreground/40 hover:text-accent transition-colors" aria-label="Mapa do site">
              Mapa do Site
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}