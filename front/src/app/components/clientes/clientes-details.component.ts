import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../../models/funcionario.models';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Cliente } from '../../models/cliente.models';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes-details',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './clientes-details.component.html',
})
export class ClienteDetailsComponent implements OnInit{
  @Input() clienteSelecionado: Cliente;
  @Output() clienteAtualizado = new EventEmitter<void>();  // Emite quando o funcionário for salvo
  editForm: UntypedFormGroup;
  isEditing = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private clienteService: ClienteService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idUser: [this.clienteSelecionado.idUser],
      nome: [this.clienteSelecionado.nome],
      contato: [this.clienteSelecionado.contato],
      cpf: [this.clienteSelecionado.cpf]
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
    this.clienteService.updateCliente(this.clienteSelecionado.idUser, this.editForm.value).subscribe(
      (response) => {
        console.log(response)
        this.toastr.success('Cliente atualizado com sucesso!', 'Sucesso');
        this.clienteAtualizado.emit();
      },
      (error) => {
        console.error('Erro ao atualizar o cliente:', error);
        this.toastr.error('Ocorreu um erro ao atualizar o cliente.', 'Erro');
      }
    );
    this.activeModal.close();
  }

}
