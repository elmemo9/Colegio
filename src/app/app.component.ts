import { Component } from '@angular/core';
import { Alumno } from './models/alumno';
import { AlumnoService } from './services/alumno.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Colegio';
  alumnos : any[] = [];
  constructor (){}
   
 
    
	
}
