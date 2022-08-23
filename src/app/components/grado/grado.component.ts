import { Component, OnInit } from '@angular/core';
import { GradoService } from '../../services/grado.service';
import { Response} from '../../models/reponse';
import { DialogGradoComponent } from './dialog/dialoggrado.component';
import { MatDialog } from '@angular/material/dialog';
import { Grado } from '../../models/grado';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  public lst!: any[];
  public columnas:string[] = ['id','nombre', 'profesorNombre', 'actions'];
  readonly width:string = '300px';
  constructor(
    private gradoService: GradoService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar
  ) { 

  }
  ngOnInit(): void {
    this.getGrados();
  }

  getGrados(){
    this.gradoService.getGrados().subscribe(response =>{
      this.lst = response.data
    });
  }
openAdd(){
    const dialogRef = this.dialog.open(DialogGradoComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getGrados();
    });
}
openEdit(grado: Grado){
  const dialogRef = this.dialog.open(DialogGradoComponent,{
    width: this.width,
    data: grado
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.getGrados();
  });
}
delete(grado:Grado){
  const dialogRef = this.dialog.open(DialogDeleteComponent,{
    width: this.width,
  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.gradoService.delete(grado.id).subscribe(response =>{
        if(response.success===1){
          this.snackBar.open('Grado eliminado con éxito', '', {
            duration:2000
          });
          this.getGrados();
        }
      })
    }
  }); 
}
}
