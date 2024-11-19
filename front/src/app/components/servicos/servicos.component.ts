// src/app/produtos/produto-list/produto-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../../models/servico.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServicoService } from '../../services/servico.service';
import { ServicoDetailsComponent } from './servicos-details.component';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
})
export class ServicosComponent implements OnInit {

  servicos: Servico[] = [];

  constructor(
    private servicoService: ServicoService, 
    private modalService: NgbModal,
    private toastr: ToastrService,
    private eventService: EventService

  ) {}

  ngOnInit() {
    this.listar();
    this.atualizaListaDepoisQueAdicionado();
  }

  listar(){
    this.servicoService.getServicos().subscribe((res: Servico[]) => {
      this.servicos = res;
    });
  }

  excluir(servico: Servico){
    this.servicoService.deleteServico(servico.idServico).subscribe(
      (response) => {
        this.toastr.success('Servico excluido com sucesso!', 'Sucesso');
        this.listar();
      },
      (error) => {
        console.error('Erro ao excluir o servico:', error);
        this.toastr.error('Ocorreu um erro ao excluir o servico.', 'Erro');
      }
    );
  }

  openModal(servico: Servico) {
    const modalRef = this.modalService.open(ServicoDetailsComponent);
    modalRef.componentInstance.servicoSelecionado = servico;
    modalRef.componentInstance.servicoAtualizado.subscribe(() => {
      this.listar();
    });
  }
  
  atualizaListaDepoisQueAdicionado(){
    this.eventService.getEvent().subscribe((data) => {
      this.listar();
    });
  }

}
