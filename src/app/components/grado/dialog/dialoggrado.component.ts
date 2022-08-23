import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Grado } from "src/app/models/grado";
import { ItemList } from "src/app/models/itemlist";
import { GradoService } from "src/app/services/grado.service";
import { ListService } from "src/app/services/list.service";

@Component({
    templateUrl:'dialoggrado.component.html'
})
export class DialogGradoComponent{
    public nombre!:string;
    public profesorId!:number;
    public profesorNombre!:string;
    public lst!: any[];
    constructor(
        public dialogRef: MatDialogRef<DialogGradoComponent>,
        public gradoService: GradoService,
        public listService: ListService,
        public snackBar: MatSnackBar,
        @Inject (MAT_DIALOG_DATA) public grado:Grado
    ) {
        if(this.grado != null){
            this.nombre= grado.nombre;
            this.profesorId = grado.profesorId;
            this.profesorNombre = grado.profesorNombre;
        }

    }
    ngOnInit(): void {
        this.getProfesores();
      }
    
      getProfesores(){
        this.listService.getProfesores().subscribe(response =>{
          this.lst = response.data
        });
      }

    close(){
        this.dialogRef.close();
    }
    editGrado(fields: any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const grado:Grado = {
            id : this.grado.id,
            nombre : this.nombre,
            profesorId: this.profesorId,
            profesorNombre: this.profesorNombre
    };
        this.gradoService.edit(grado).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('Grado modificado con éxito','',{
                    duration:2000
                });
            }else{
                this.snackBar.open(response.message,"Error",{
                    duration:2000,
                    
                });
            }
        }, error: (error)=>{
            this.snackBar.open(error.message,"Error",{
                duration:2000,
                
            });
        }});
    }
    addGrado(fields : any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const grado: Grado = {
            id : 0,
            nombre : this.nombre,
            profesorId: this.profesorId,
            profesorNombre: this.profesorNombre
    };
        this.gradoService.add(grado).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('Grado insertado con éxito','',{
                    duration:2000
                });
            }else{
                this.snackBar.open(response.message,"Error",{
                    duration:2000,
                    
                });
            }
        }, error: (error)=>{
            this.snackBar.open(error.message,"Error",{
                duration:2000,
                
            });
        }});
    }
}