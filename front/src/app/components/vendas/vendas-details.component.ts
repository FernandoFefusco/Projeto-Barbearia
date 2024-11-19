import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../models/vendas.models';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario.service';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';
import { Servico } from '../../models/servico.models';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-vendas-details',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './vendas-details.component.html',
})
export class VendaDetailsComponent implements OnInit{
  @Input() vendaSelecionado: Venda;
  @Output() vendaAtualizado = new EventEmitter<void>();  // Emite quando o funcionário for salvo
  editForm: UntypedFormGroup;
  isEditing = false;

  funcionarios: Funcionario[] = [];
  clientes: Cliente[] = [];
  idServicos: number[] = [];
  servicos: Servico[] = [];
  selectedItems: Servico[] = [];
  totalValorPago: number = 0;

  constructor(
    public activeModal: NgbActiveModal, 
    private vendaService: VendaService, 
    private funcionarioService: FuncionarioService, 
    private clienteService: ClienteService, 
    private servicoService: ServicoService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.listarFuncionario();
    this.listarCliente();
    this.listarIdServicos();
    this.listarServicos();
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idVenda: [this.vendaSelecionado.idVenda],
      idCliente: [this.vendaSelecionado.cliente.idUser],
      idFuncionario: [this.vendaSelecionado.funcionario.idUser],
      dataVenda: [this.vendaSelecionado.dataVenda],
      valorPago: [this.vendaSelecionado.valorPago],
      idServico: [this.idServicos],
    });
    this.totalValorPago = this.vendaSelecionado.valorPago;
  }

  listarIdServicos(){
    this.idServicos = this.vendaSelecionado.servicos.map(servico => servico.idServico);
    this.selectedItems = this.vendaSelecionado.servicos;
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

  listarServicos(){
    this.servicoService.getServicos().subscribe((res: Servico[]) => {
      this.servicos = res.filter(servico => 
        !this.selectedItems.some(selected => selected.idServico === servico.idServico)
      );
    });
  }

  // Função para iniciar o modo de edição
  edit() {
    this.isEditing = true;
  }

  discardChanges() {
    this.isEditing = false;
    this.createForm();
  }

  close() {
    this.activeModal.close();  // Fechar o modal
  }

  save() {
    console.log(this.editForm)
    this.vendaService.updateVenda(this.vendaSelecionado.idVenda, this.editForm.value).subscribe(
      (response) => {
        this.toastr.success('Venda atualizado com sucesso!', 'Sucesso');
        this.vendaAtualizado.emit();
      },
      (error) => {
        console.error('Erro ao atualizar a venda:', error);
        this.toastr.error('Ocorreu um erro ao atualizar a venda.', 'Erro');
      }
    );
    this.activeModal.close();
  }

  onSelecionarFuncionario($event: any){
    this.vendaSelecionado.funcionario = $event.value;
  }

  onSelecionarCliente($event: any){
    this.vendaSelecionado.cliente = $event.value;
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
    this.totalValorPago = Math.max(0, this.totalValorPago - item.preco);
    this.editForm.patchValue({valorPago: this.totalValorPago});
    this.atualizaListaDeSelecionados();
  }
}
