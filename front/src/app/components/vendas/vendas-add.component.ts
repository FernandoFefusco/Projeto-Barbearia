import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../../models/funcionario.models';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ServicoService } from '../../services/servico.service';
import { VendaService } from '../../services/venda.service';
import { Servico } from '../../models/servico.models';
import { Cliente } from '../../models/cliente.models';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-vendas-add',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './vendas-add.component.html',
})
export class VendaAddComponent implements OnInit{
  editForm: UntypedFormGroup;
  isEditing = false;
  servicos: Servico[] = [];
  selectedItems: Servico[] = [];
  idServicos: number[] = [];
  funcionarios: Funcionario[] = [];
  clientes: Cliente[] = [];
  totalValorPago: number = 0;

  constructor(
    public activeModal: NgbActiveModal, 
    private vendasService: VendaService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private funcionarioService: FuncionarioService, 
    private clienteService: ClienteService, 
    private servicoService: ServicoService, 
    private eventService: EventService

  ) { }

  ngOnInit() {
    this.listarFuncionario();
    this.listarCliente();
    this.listarServicos();
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idVenda: [''],
      idCliente: [''],
      idFuncionario: [''],
      dataVenda: [''],
      valorPago: [0],
      idServico: [''],
    });
  }

  close() {
    this.activeModal.close();  // Fechar o modal
  }

  save() {
    this.vendasService.createVenda(this.editForm.value).subscribe(
      (response) => {
        this.toastr.success('servico criado com sucesso!', 'Sucesso');
        this.eventService.emitEvent("");
      },
      (error) => {
        console.error('Erro ao criar o servico:', error);
        this.toastr.error('Ocorreu um erro ao criar o servico.', 'Erro');
      }
    );
    this.activeModal.close();
  }

  atualizaListaDeSelecionados(){
    this.idServicos = this.selectedItems.map(servico => servico.idServico);
    this.editForm.patchValue({
      idServico: this.idServicos
    });
  }

  listarFuncionario(){
    this.funcionarioService.getFuncionarios().subscribe((res: Funcionario[]) => {
      this.funcionarios = res;
    });
  }

  listarCliente(){
    this.clienteService.getClientes().subscribe((res: Cliente[]) => {
      this.clientes = res;
    });
  }

  addToSelected(item: any) {
    // Remove o item da lista de disponíveis
    this.servicos = this.servicos.filter(i => i !== item);
    // Adiciona o item à lista de selecionados
    this.selectedItems.push(item);
    this.totalValorPago += item.preco;
    this.editForm.patchValue({valorPago: this.totalValorPago});
    this.atualizaListaDeSelecionados();
  }

  removeFromSelected(item: any) {
    // Remove o item da lista de selecionados
    this.selectedItems = this.selectedItems.filter(i => i !== item);
    // Adiciona o item de volta à lista de disponíveis
    this.servicos.push(item);
    this.totalValorPago -= item.preco;
    this.editForm.patchValue({valorPago: this.totalValorPago});
    this.atualizaListaDeSelecionados();
  }
  onSelecionarFuncionario($event: any){
    this.editForm.patchValue({idFuncionario: $event.target.value})
  }

  onSelecionarCliente($event: any){
    this.editForm.patchValue({idCliente: $event.target.value})
  }

  listarServicos(){
    this.servicoService.getServicos().subscribe((res: Servico[]) => {
      this.servicos = res.filter(servico => 
        !this.selectedItems.some(selected => selected.idServico === servico.idServico)
      );
    });
  }
}
