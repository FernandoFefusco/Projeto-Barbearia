import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.models';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/funcionario';

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl).pipe();
  }

  updateFuncionario(idUser: number, funcionario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idUser}`, funcionario);
  }

  deleteFuncionario(idUser: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idUser}`);
  }

  createFuncionario(funcionario: any): Observable<any> {
    return this.http.post(this.apiUrl, funcionario);
  }

}
