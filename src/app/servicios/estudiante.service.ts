import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudiante } from '../modelos/estudiante.model';
import { Usuario } from '../modelos/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  constructor(private http: HttpClient) { }

  listar(): Observable<Estudiante[]> {
    console.log("solicitud de listar");    
  return this.http.get<Estudiante[]>(`${environment.url_gateway}/estudiantes`);
  }
  eliminar(id:string){
  return this.http.delete<Estudiante>(`${environment.url_gateway}/estudiantes/${id}`,);
  }
}