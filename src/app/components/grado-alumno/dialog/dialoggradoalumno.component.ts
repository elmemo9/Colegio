import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GradoAlumno } from "src/app/models/gradoalumno";
import { GradoAlumnoService } from "src/app/services/gradoalumno.service";
import { ListService } from "src/app/services/list.service";

@Component({
    templateUrl:'dialoggradoalumno.component.html'
})
export class DialogGradoAlumnoComponent{
    public alumnoId!:number;
    public alumnoNombre!:string;
    public gradoId!:number;
    public gradoNombre!:string;
    public seccion!:string;
    public lstAlumno!: any[];
    public lstGrado!: any[];
    constructor(
        public dialogRef: MatDialogRef<DialogGradoAlumnoComponent>,
        public gradoAlumnoService: GradoAlumnoService,
        public listService: ListService,
        public snackBar: MatSnackBar,
        @Inject (MAT_DIALOG_DATA) public gradoAlumno:GradoAlumno
    ) {
        if(this.gradoAlumno != null){
            this.alumnoId = gradoAlumno.alumnoId;
            this.alumnoNombre = gradoAlumno.alumnoNombre;
            this.gradoId = gradoAlumno.gradoId;
            this.gradoNombre = gradoAlumno.gradoNombre;
            this.seccion = gradoAlumno.seccion;
        }
    }

    ngOnInit(): void {
        this.getGrados();
        this.getAlumnos();
      }
      getAlumnos(){
        this.listService.getAlumnos().subscribe(response =>{
          this.lstAlumno = response.data
        });
      }
      getGrados(){
        this.listService.getGrados().subscribe(response =>{
          this.lstGrado = response.data
        });
      }

    close(){
        this.dialogRef.close();
    }
    editGradoAlumno(fields : any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const gradoAlumno:GradoAlumno = {
            id : this.gradoAlumno.id,
            alumnoId : this.alumnoId,
            alumnoNombre : this.alumnoNombre,
            gradoId : this.gradoId,
            gradoNombre : this.gradoNombre,
            seccion : this.seccion
    };
        this.gradoAlumnoService.edit(gradoAlumno).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('GradoAlumno editado con éxito','',{
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
    addGradoAlumno(fields: any[]){
        let hasErrors = fields.find(field => field.errors != null);
        if (hasErrors){
            this.snackBar.open('Campos no válidos','',{
                duration:2000
            });
            return;
        }
        const gradoAlumno: GradoAlumno = {
            id : 0,
            alumnoId : this.alumnoId,
            alumnoNombre : this.alumnoNombre,
            gradoId : this.gradoId,
            gradoNombre : this.gradoNombre,
            seccion : this.seccion
    };
        this.gradoAlumnoService.add(gradoAlumno).subscribe({next :(response)=>{
            if(response.success === 1){
                this.dialogRef.close();
                this.snackBar.open('GradoAlumno insertado con éxito','',{
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