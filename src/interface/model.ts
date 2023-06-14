export interface DataItem {
  id: string;
  nombre: string;
  idColor: string;
  canalConection: string;
  offsets: Cordenada[];
}

export interface Cordenada {
  dx: number;
  dy: number;
}

export interface CirclePosition {
  idAlumno: string;
  offset: Cordenada;
}
