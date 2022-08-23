import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Profesor } from "src/app/models/profesor";
import { ProfesorService } from "src/app/services/profesor.service";

@Component({
    templateUrl:'dialogprofesor.component.html'
})
export class DialogProfesorComponent{
    public nombre!:string;
    public apellidos!:string;
    public genero!:string;
    public generos : Array<string> = [
        'Masculino', 
        'Femenino', 
        'Prefiero no decirlo',
        'Otro'
    ];
    constructor(
        public dialogRef: MatDialogRef<DialogProfesorComponent>,
        public profesorService: ProfesorService,
        public snackBar: MatSnackBar,
        @Inject (MAT_DIALOG_DATA) public profesor:Profesor
    ) {
        if(this.profesor != null){
            this.nombre=profesor.nombre;
            this.apellidos =profesor.apellidos;
            this.genero = profesor.genero;
        }
    }
    close(){
        this.dialogRef.close();
    }
    editProfesor(fields : any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const profesor:Profesor = {
            id : this.profesor.id,
            nombre : this.nombre,
            apellidos: this.apellidos,
            genero: this.genero,
    };
        this.profesorService.edit(profesor).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('Profesor modificado con éxito','',{
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
    addProfesor(fields: any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const profesor: Profesor = {
            id : 0,
            nombre : this.nombre,
            apellidos: this.apellidos,
            genero: this.genero,
    };
        this.profesorService.add(profesor).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('Profesor insertado con éxito','',{
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