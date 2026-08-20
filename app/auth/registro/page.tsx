"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registrar } from "@/services/auth.service";
import { esCorreoValido, esContrasenaValida } from "@/lib/validations";

/** Pantalla 02 — Crear cuenta (HU-ORG-01). */
export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!nombre || !apellido) return setError("Completá nombre y apellido.");
    if (!esCorreoValido(email)) return setError("Ingresá un correo válido.");
    if (!esContrasenaValida(contrasena)) return setError("La contraseña debe tener 8 caracteres, una mayúscula y un número.");

    registrar({ nombre, apellido, email });
    router.push("/proyectos");
  }

  return (
    <>
      <AppHeader volverA="/" volverLabel="Inicio" />
      <div className="app-shell auth-shell">
        <h1>Creá tu cuenta</h1>
        <p className="sub-lede">Guardá tus planos y continuá editándolos cuando quieras.</p>

        <form className="project-form" onSubmit={enviar}>
          <div className="form-grid">
            <Input label="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Input label="Apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <Input label="Correo electrónico" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              label="Contraseña"
              type="password"
              required
              hint="Mínimo 8 caracteres, una mayúscula y un número."
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error ? <p className="form-error">{error}</p> : null}
          <div className="form-actions">
            <Button type="submit" size="lg">
              Crear cuenta
            </Button>
          </div>
        </form>

        <p className="auth-switch">
          ¿Ya tenés una cuenta? <a href="/auth/iniciar-sesion">Iniciar sesión</a>
        </p>
      </div>
    </>
  );
}
