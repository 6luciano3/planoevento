export interface Punto {
  x: number;
  y: number;
}

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface Predio {
  id: string;
  nombre: string;
  provincia: string;
  municipio: string;
  localidad: string;
  direccion: string;
  latitud: number;
  longitud: number;
  superficieM2: number;
  /** Vértices del polígono del predio, en coordenadas geográficas. */
  limite: Coordenadas[];
}
