// src/app/vendas/venda-list/venda-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../models/cliente.models';
import { ClienteDetailsComponent } from './clientes-details.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, NgbModalModule  ],
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  constructor(
    private clienteService: ClienteService, 
    private modalService: NgbModal,
    private toastr: ToastrService,
    private eventService: EventService
  ) {}

  clientes: Cliente[] = [];

  ngOnInit() {
    this.listar();
    this.atualizaListaDepoisQueAdicionado();
  }

  listar(){
    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.clientes = res;
    });
  }

  excluir(cliente: Cliente){
    this.clienteService.deleteCliente(cliente.idUser).subscribe(
      (response) => {
        this.toastr.success('Cliente excluido com sucesso!', 'Sucesso');
        this.listar();
      },
      (error) => {
        console.error('Erro ao excluir o cliente:', error);
        this.toastr.error('Ocorreu um erro ao excluir o cliente.', 'Erro');
      }
    );
  }

  atualizaListaDepoisQueAdicionado(){
    this.eventService.getEvent().subscribe((data) => {
      this.listar();
    });
  }

  openModal(cliente: Cliente) {
    const modalRef = this.modalService.open(ClienteDetailsComponent);
    modalRef.componentInstance.clienteSelecionado = cliente;
    modalRef.componentInstance.clienteAtualizado.subscribe(() => {
      this.listar();
    });
  }

}
