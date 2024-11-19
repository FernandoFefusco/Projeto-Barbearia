import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/vendas.models';


@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/vendas';

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl).pipe();
  }

  updateVenda(idVenda: number, venda: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idVenda}`, venda);
  }

  deleteVenda(idVenda: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idVenda}`);
  }

  createVenda(venda: any): Observable<any> {
    return this.http.post(this.apiUrl, venda);
  }

}
