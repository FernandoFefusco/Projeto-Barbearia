// src/app/vendas/venda-list/venda-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Venda } from '../../models/vendas.models';
import { VendaService } from '../../services/venda.service';
import { VendaDetailsComponent } from './vendas-details.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendas.component.html',
})
export class VendasComponent implements OnInit {

  vendas: Venda[] = [];

  constructor(
    private vendaService: VendaService, 
    private modalService: NgbModal,
    private toastr: ToastrService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.listar();
    this.atualizaListaDepoisQueAdicionado();
  }

  listar(){
    this.vendaService.getVendas().subscribe((res: Venda[]) => {
      this.vendas = res;
    });
  }

  excluir(venda: Venda){
    this.vendaService.deleteVenda(venda.idVenda).subscribe(
      (response) => {
        this.toastr.success('Venda excluido com sucesso!', 'Sucesso');
        this.listar();
      },
      (error) => {
        console.error('Erro ao excluir a venda:', error);
        this.toastr.error('Ocorreu um erro ao excluir a venda.', 'Erro');
      }
    );
  }

  openModal(venda: Venda) {
    const modalRef = this.modalService.open(VendaDetailsComponent);
    modalRef.componentInstance.vendaSelecionado = venda;
    modalRef.componentInstance.vendaAtualizado.subscribe(() => {
      this.listar();
    });
  }
  
  atualizaListaDepoisQueAdicionado(){
    this.eventService.getEvent().subscribe((data) => {
      this.listar();
    });
  }

}
