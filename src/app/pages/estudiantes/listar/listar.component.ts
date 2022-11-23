import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudiantesService } from '../../../servicios/estudiante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  estudiantes : Estudiante[];
  nombresColumnas: string[] = ['Cedula','Nombre','Apellido','Opciones'];
  constructor(private miServicioEstudiantes: EstudiantesService, private router: Router) { }

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
    this.router.navigate(["pages/estudiantes/crear"]);
  }
  editar(id:string):void{
    this.router.navigate(["pages/estudiantes/actualizar/"+id]);
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
