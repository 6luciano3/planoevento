"use client";

import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
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
    <AuthLayout
      asideTitle="Volvé a tus proyectos de forma segura"
      asideText="Protegemos el acceso a tus planos y archivos exportados."
      asideItems={["Ingresá tu correo", "Abrí el enlace recibido", "Creá una nueva contraseña"]}
      switchText="¿Recordaste tu contraseña?"
      switchHref="/auth/iniciar-sesion"
      switchLabel="Iniciar sesión"
    >
      <h1>Recuperá tu contraseña</h1>
      <p className="sub-lede">Ingresá el correo asociado a tu cuenta y te enviaremos un enlace para crear una nueva contraseña.</p>

      {enviado ? (
        <div className="callout-info">
          Si el correo existe en nuestros registros, vas a recibir un enlace de recuperación en los próximos minutos.
        </div>
      ) : (
        <form className="project-form" onSubmit={enviar}>
          <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
            <Input label="Correo electrónico" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-actions" style={{ justifyContent: "stretch" }}>
            <Button type="submit" size="lg" style={{ width: "100%", justifyContent: "center" }}>
              Enviar enlace de recuperación
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
