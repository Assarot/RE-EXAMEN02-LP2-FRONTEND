export class Empleado {
  idempleado: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  constructor(
    idempleado: number,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: string
  ) {
    this.idempleado = idempleado;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correo = correo;
    this.telefono = telefono;
  }
}
