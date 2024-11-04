import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'empleado',
    component: EmpleadoComponent,
    title: 'Empleados',
  },
];
