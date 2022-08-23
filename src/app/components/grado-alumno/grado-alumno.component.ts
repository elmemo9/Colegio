import { Component, OnInit } from '@angular/core';
import { GradoAlumnoService } from '../../services/gradoalumno.service';
import { Response} from '../../models/reponse';
import { DialogGradoAlumnoComponent } from './dialog/dialoggradoalumno.component';
import { MatDialog } from '@angular/material/dialog';
import { GradoAlumno } from '../../models/gradoalumno';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gradoalumno',
  templateUrl: './grado-alumno.component.html',
  styleUrls: ['./grado-alumno.component.css']
})
export class GradoAlumnoComponent implements OnInit {

  public lst!: any[];
  public columnas:string[] = ['id',  'alumnoNombre',  'gradoNombre', 'seccion', 'actions'];
  readonly width:string = '300px';
  constructor(
    private gradoAlumnoService: GradoAlumnoService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { 

  }
  ngOnInit(): void {
    this.getGradoAlumnos();
  }

  getGradoAlumnos(){
    this.gradoAlumnoService.getGradoAlumnos().subscribe(response =>{
      this.lst = response.data
    });
  }
openAdd(){
    const dialogRef = this.dialog.open(DialogGradoAlumnoComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getGradoAlumnos();
    });
}
openEdit(gradoAlumno: GradoAlumno){
  const dialogRef = this.dialog.open(DialogGradoAlumnoComponent,{
    width: this.width,
    data: gradoAlumno
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.getGradoAlumnos();
  });
}
delete(gradoAlumno:GradoAlumno){
  const dialogRef = this.dialog.open(DialogDeleteComponent,{
    width: this.width,
  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.gradoAlumnoService.delete(gradoAlumno.id).subscribe(response =>{
        if(response.success===1){
          this.snackBar.open('GradoAlumno eliminado con éxito', '', {
            duration:2000
          });
          this.getGradoAlumnos();
        }
      })
    }
  }); 
}
}

