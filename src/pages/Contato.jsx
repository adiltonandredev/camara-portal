import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Footer from "../components/home/Footer";

const contactInfo = [
  { icon: MapPin, label: "Endereço", value: "Av. Cuiabá, s/n - Centro\nPresidente Médici - RO, 76916-000" },
  { icon: Phone, label: "Telefone", value: "(69) 3471-2600" },
  { icon: Mail, label: "E-mail", value: "camara@presidentemedici.ro.leg.br" },
  { icon: Clock, label: "Horário", value: "Segunda a Sexta\n07:30 às 13:30" },
];

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setSending(true);
    // Simulated send
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Mensagem enviada com sucesso!");
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-body text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Fale Conosco
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contato
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-2xl">
            Entre em contato com a Câmara Municipal de Presidente Médici.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{info.label}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{info.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Envie sua Mensagem
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                      Nome *
                    </label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="h-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-foreground mb-2">
                    Assunto
                  </label>
                  <Input
                    id="assunto"
                    value={formData.assunto}
                    onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                    placeholder="Assunto da mensagem"
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Escreva sua mensagem..."
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
                >
                  {sending ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}