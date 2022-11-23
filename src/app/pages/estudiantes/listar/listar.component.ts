import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudiantesService } from '../../../servicios/estudiante.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  estudiantes : Estudiante[];
  nombresColumnas: string[] = ['Cedula','Nombre','Apellido','Opciones'];
  constructor(private miServicioEstudiantes: EstudiantesService) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioEstudiantes.listar().
      subscribe(data => {
        this.estudiantes=data;
      });
  }
  agregar():void{
    console.log("agregando nuevo")
  }
  editar(id:string):void{
    console.log("editando a "+id)
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Está seguro que quiere eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioEstudiantes.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
