import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.models';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/cliente';

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl).pipe();
  }

  updateCliente(idUser: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idUser}`, cliente);
  }

  deleteCliente(idUser: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idUser}`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

}
