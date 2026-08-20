export function esCorreoValido(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export function esContrasenaValida(contrasena: string): boolean {
  return contrasena.length >= 8 && /[A-Z]/.test(contrasena) && /[0-9]/.test(contrasena);
}

export function campoObligatorio(valor: string | undefined | null): boolean {
  return Boolean(valor && valor.trim().length > 0);
}
