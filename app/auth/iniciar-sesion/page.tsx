"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { iniciarSesion } from "@/services/auth.service";
import { esCorreoValido } from "@/lib/validations";

/** Pantalla 03 — Iniciar sesión (HU-ORG-02). */
export default function IniciarSesionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!esCorreoValido(email) || contrasena.length === 0) {
      setError("Revisá el correo y la contraseña.");
      return;
    }
    iniciarSesion(email);
    router.push("/proyectos");
  }

  return (
    <AuthLayout
      asideTitle="Retomá tu plano donde lo dejaste"
      asideText="Tus proyectos, componentes y configuraciones quedan guardados en tu cuenta."
      asideItems={["Base geográfica con TopoExport", "Biblioteca completa de componentes", "Exportación a PDF a escala real"]}
      switchText="¿Todavía no tenés una cuenta?"
      switchHref="/auth/registro"
      switchLabel="Crear cuenta"
    >
      <h1>Iniciá sesión</h1>
      <p className="sub-lede">Accedé a tus planos y continuá trabajando en tus proyectos.</p>

      <form className="project-form" onSubmit={enviar}>
        <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
          <Input label="Correo electrónico" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Contraseña" type="password" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <div className="form-actions" style={{ justifyContent: "stretch" }}>
          <Button type="submit" size="lg" style={{ width: "100%", justifyContent: "center" }}>
            Iniciar sesión
          </Button>
        </div>
      </form>

      <p className="auth-switch">
        <a href="/auth/recuperar-acceso">¿Olvidaste tu contraseña?</a>
      </p>
    </AuthLayout>
  );
}
