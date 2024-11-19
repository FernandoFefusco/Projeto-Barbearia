import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico.models';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/servicos';

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl).pipe();
  }

  updateServico(idServico: number, servico: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idServico}`, servico);
  }

  deleteServico(idServico: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idServico}`);
  }

  createServico(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

}
