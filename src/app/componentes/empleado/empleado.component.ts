import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Empleado } from '../../model/empleado';
import { EmpleadoService } from '../../service/empleado.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    HomeComponent,
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent {
  empleados: Empleado[] = [];
  titulo: string = '';
  accion: string = '';
  empleado = new Empleado(0, '', '', '', '');
  op = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  constructor(
    private empleadoService: EmpleadoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarEmpleados();
  }

  listarEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Nuevo Empleado';
    this.accion = 'Guardar';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(idempleado: number) {
    this.titulo = 'Editar Empleado';
    this.accion = 'Actualizar';
    this.empleadoService.getEmpleadoById(idempleado).subscribe((data) => {
      this.empleado = data;
      this.op = 1;
    });
    this.visible = true;
  }

  deleteEmpleado(idempleado: number) {
    this.isDeleteInProgress = true;
    this.empleadoService.deleteEmpleado(idempleado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empleado eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarEmpleados();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el empleado',
        });
      },
    });
  }

  guardarEmpleado(): void {
    console.log('Empleado antes de enviar:', this.empleado);
    this.empleadoService.createEmpleado(this.empleado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empleado creado',
        });
        this.listarEmpleados();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el empleado',
        });
      },
    });
    this.visible = false;
  }

  actualizarEmpleado() {
    this.empleadoService.updateEmpleado(this.empleado).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Empleado editado',
        });
        this.listarEmpleados();
        console.log(
          this.empleado.idempleado +
            ' ' +
            this.empleado.nombres +
            ' ' +
            this.empleado.apellidos +
            ' ' +
            this.empleado.correo +
            '' +
            this.empleado.telefono
        );
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el empleado',
        });
      },
    });
    this.visible = false;
  }

  ejecutarAccion(): void {
    if (this.op == 0) {
      this.guardarEmpleado();
      this.limpiar();
    } else if (this.op == 1) {
      this.actualizarEmpleado();
      this.limpiar();
    } else {
      console.log('No se hace nada');
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.accion = '';
    this.op = 0;
    this.empleado.idempleado = 0;
    this.empleado.nombres = '';
    this.empleado.apellidos = '';
    this.empleado.correo = '';
    this.empleado.telefono = '';
  }
}
