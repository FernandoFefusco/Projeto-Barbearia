import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Servico } from '../../models/servico.models';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-servicos-details',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './servicos-details.component.html',
})
export class ServicoDetailsComponent implements OnInit{
  @Input() servicoSelecionado: Servico;
  @Output() servicoAtualizado = new EventEmitter<void>();  // Emite quando o funcionário for salvo
  editForm: UntypedFormGroup;
  isEditing = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private servicoCliente: ServicoService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idServico: [this.servicoSelecionado.idServico],
      tipo: [this.servicoSelecionado.tipo],
      preco: [this.servicoSelecionado.preco],
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
    this.servicoCliente.updateServico(this.servicoSelecionado.idServico, this.editForm.value).subscribe(
      (response) => {
        this.toastr.success('Servico atualizado com sucesso!', 'Sucesso');
        this.servicoAtualizado.emit();
      },
      (error) => {
        console.error('Erro ao atualizar o servico:', error);
        this.toastr.error('Ocorreu um erro ao atualizar o servico.', 'Erro');
      }
    );
    this.activeModal.close();
  }

}
