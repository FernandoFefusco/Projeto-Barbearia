import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../../models/funcionario.models';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-funcionarios-details',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './funcionarios-details.component.html',
})
export class FuncionarioDetailsComponent implements OnInit{
  @Input() funcionarioSelecionado: Funcionario;
  @Output() funcionarioAtualizado = new EventEmitter<void>();  // Emite quando o funcionário for salvo
  editForm: UntypedFormGroup;
  isEditing = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private funcionariosService: FuncionarioService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idUser: [this.funcionarioSelecionado.idUser],
      nome: [this.funcionarioSelecionado.nome],
      contato: [this.funcionarioSelecionado.contato],
      cpf: [this.funcionarioSelecionado.cpf]
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
    this.funcionariosService.updateFuncionario(this.funcionarioSelecionado.idUser, this.editForm.value).subscribe(
      (response) => {
        console.log(response)
        this.toastr.success('Funcionário atualizado com sucesso!', 'Sucesso');
        this.funcionarioAtualizado.emit();
      },
      (error) => {
        console.error('Erro ao atualizar o funcionário:', error);
        this.toastr.error('Ocorreu um erro ao atualizar o funcionário.', 'Erro');
      }
    );
    this.activeModal.close();
  }

}
