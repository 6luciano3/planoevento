/** Verifica si un rectángulo (en metros, esquina superior izquierda + ancho/alto) cae dentro del área imprimible de la hoja. */
export function estaDentroDelAreaImprimible(
  posicion: { x: number; y: number },
  anchoM: number,
  largoM: number,
  areaImprimibleM: { x: number; y: number; ancho: number; alto: number }
): boolean {
  return (
    posicion.x >= areaImprimibleM.x &&
    posicion.y >= areaImprimibleM.y &&
    posicion.x + anchoM <= areaImprimibleM.x + areaImprimibleM.ancho &&
    posicion.y + largoM <= areaImprimibleM.y + areaImprimibleM.alto
  );
}

export function rotarGrados(actualGrados: number, incrementoGrados: number): number {
  return (((actualGrados + incrementoGrados) % 360) + 360) % 360;
}
