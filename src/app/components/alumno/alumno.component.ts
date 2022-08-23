import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Response} from '../../models/reponse';
import { DialogAlumnoComponent } from './dialog/dialogalumno.component';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../models/alumno';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  public lst!: any[];
  public columnas:string[] = ['id','nombre', 'apellidos', 'genero', 'fechaNacimiento', 'actions'];
  readonly width:string = '300px';
  constructor(
    private alumnoService: AlumnoService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { 

  }
  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe(response =>{
      this.lst = response.data
    });
  }
openAdd(){
    const dialogRef = this.dialog.open(DialogAlumnoComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getAlumnos();
    });
}
openEdit(alumno: Alumno){
  const dialogRef = this.dialog.open(DialogAlumnoComponent,{
    width: this.width,
    data: alumno
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.getAlumnos();
  });
}
delete(alumno:Alumno){
  const dialogRef = this.dialog.open(DialogDeleteComponent,{
    width: this.width,
  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.alumnoService.delete(alumno.id).subscribe(response =>{
        if(response.success===1){
          this.snackBar.open('Alumno eliminado con éxito', '', {
            duration:2000
          });
          this.getAlumnos();
        }
      })
    }
  }); 
}
}
