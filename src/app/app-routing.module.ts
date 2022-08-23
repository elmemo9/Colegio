import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { GradoAlumnoComponent } from './components/grado-alumno/grado-alumno.component';
import { GradoComponent } from './components/grado/grado.component';
import { ProfesorComponent } from './components/profesor/profesor.component';

const routes: Routes = [
{path:'',  component: HomeComponent},
{path:'home', component: HomeComponent},
{path:'alumno', component: AlumnoComponent/*, canActivate : [AuthGuard]*/},
{path:'grado', component: GradoComponent},
{path:'gradoAlumno', component: GradoAlumnoComponent},
{path:'profesor', component: ProfesorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
