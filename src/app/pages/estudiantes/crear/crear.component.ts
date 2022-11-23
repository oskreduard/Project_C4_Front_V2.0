import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudiantesService } from '../../../servicios/estudiante.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  id_estudiante: string = "";
  intentoEnvio: boolean = false;
  elEstudiante: Estudiante = {
    cedula: "",
    nombre: "",
    apellido: ""
  }
  constructor(private miServicioEstudiantes: EstudiantesService,
              private rutaActiva: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_estudiante) {
      this.modoCreacion = false;
      this.id_estudiante = this.rutaActiva.snapshot.params.id_estudiante;
      this.getEstudiante(this.id_estudiante)
    } else {
      this.modoCreacion = true;
    }
  }
  getEstudiante(id: string) {
    this.miServicioEstudiantes.getEstudiante(id).
      subscribe(data => {
        this.elEstudiante = data;
      });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioEstudiantes.crear(this.elEstudiante).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El estudiante ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/estudiantes/listar"]);
        });
    }
  }
  editar(): void {
    if (this.validarDatosCompletos()) {
      this.miServicioEstudiantes.editar(this.elEstudiante._id, this.elEstudiante).
        subscribe(data => {
          Swal.fire(
          'Actualizado',
          'El estudiante ha sido actualizado correctamente',
          'success'
          )
        this.router.navigate(["pages/estudiantes/listar"]);
        });
    }
  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elEstudiante.cedula=="" || this.elEstudiante.nombre=="" || this.elEstudiante.apellido==""){
      return false;
    }else{
      return true;
    }
  }
}
