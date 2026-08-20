"use client";

import { useState, type FormEvent } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { esCorreoValido } from "@/lib/validations";

/** Pantalla 04 — Recuperar contraseña. */
export default function RecuperarAccesoPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!esCorreoValido(email)) return;
    // Etapa 2: disparar el envío real del correo desde app/api/.
    setEnviado(true);
  }

  return (
    <>
      <AppHeader volverA="/auth/iniciar-sesion" volverLabel="Iniciar sesión" />
      <div className="app-shell auth-shell">
        <h1>Recuperá tu contraseña</h1>
        <p className="sub-lede">Ingresá el correo asociado a tu cuenta y te enviaremos un enlace para crear una nueva contraseña.</p>

        {enviado ? (
          <div className="callout-info">
            Si el correo existe en nuestros registros, vas a recibir un enlace de recuperación en los próximos minutos.
          </div>
        ) : (
          <form className="project-form" onSubmit={enviar}>
            <div className="form-grid">
              <Input label="Correo electrónico" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-actions">
              <Button type="submit" size="lg">
                Enviar enlace de recuperación
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
