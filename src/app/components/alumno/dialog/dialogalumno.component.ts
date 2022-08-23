import { Component, Inject } from "@angular/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Alumno } from "src/app/models/alumno";
import { AlumnoService } from "src/app/services/alumno.service";

@Component({
    templateUrl:'dialogalumno.component.html'
})
export class DialogAlumnoComponent{
    public nombre!:string;
    public apellidos!:string;
    public genero!:string;
    public fechaNacimiento!:Date;
    public generos : Array<string> = [
        'Masculino', 
        'Femenino', 
        'Prefiero no decirlo',
        'Otro'
    ];
    constructor(
        public dialogRef: MatDialogRef<DialogAlumnoComponent>,
        public alumnoService: AlumnoService,
        public snackBar: MatSnackBar,
        @Inject (MAT_DIALOG_DATA) public alumno:Alumno
    ) {

        if(this.alumno != null){
            this.nombre=alumno.nombre;
            this.apellidos =alumno.apellidos;
            this.genero = alumno.genero;
            this.fechaNacimiento = alumno.fechaNacimiento;
        }
    }
    close(){
        this.dialogRef.close();
    }
    editAlumno(fields : any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const alumno:Alumno = {
            id : this.alumno.id,
            nombre : this.nombre,
            apellidos: this.apellidos,
            genero: this.genero,
            fechaNacimiento : this.fechaNacimiento
    };

        
            this.alumnoService.edit(alumno).subscribe({ next:(response)=>{
                
                if(response.success === 1){
                    this.dialogRef.close();
                    this.snackBar.open("El alumno se ha modificado correctamente","Éxito",{
                        duration:2000,
                        
                    });
                }else{
                    
                    this.snackBar.open(response.message,"Error",{
                        duration:2000,
                        
                    });
                }
           
            },error: (error)=>{
                this.snackBar.open(error.message,"Error",{
                    duration:2000,
                    
                });
            }}
            );
        
            
        
        
    }
    addAlumno(fields: any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const alumno: Alumno = {
            id : 0,
            nombre : this.nombre,
            apellidos: this.apellidos,
            genero: this.genero,
            fechaNacimiento : this.fechaNacimiento
    };
        this.alumnoService.add(alumno).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('Alumno insertado con éxito','',{
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