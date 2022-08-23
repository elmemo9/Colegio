import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { Response} from '../../models/reponse';
import { DialogProfesorComponent } from './dialog/dialogprofesor.component';
import { MatDialog } from '@angular/material/dialog';
import { Profesor } from '../../models/profesor';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  public lst!: any[];
  public columnas:string[] = ['id','nombre', 'apellidos', 'genero', 'actions'];
  readonly width:string = '300px';
  constructor(
    private profesorService: ProfesorService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { 

  }
  ngOnInit(): void {
    this.getProfesors();
  }

  getProfesors(){
    this.profesorService.getProfesors().subscribe(response =>{
      this.lst = response.data
    });
  }
openAdd(){
    const dialogRef = this.dialog.open(DialogProfesorComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getProfesors();
    });
}
openEdit(profesor: Profesor){
  const dialogRef = this.dialog.open(DialogProfesorComponent,{
    width: this.width,
    data: profesor
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.getProfesors();
  });
}
delete(profesor:Profesor){
  const dialogRef = this.dialog.open(DialogDeleteComponent,{
    width: this.width,
  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.profesorService.delete(profesor.id).subscribe(response =>{
        if(response.success===1){
          this.snackBar.open('Profesor eliminado con éxito', '', {
            duration:2000
          });
          this.getProfesors();
        }
      })
    }
  }); 
}
}
