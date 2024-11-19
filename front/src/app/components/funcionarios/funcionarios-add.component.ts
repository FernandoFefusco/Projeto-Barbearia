import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../../models/funcionario.models';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-funcionarios-add',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './funcionarios-add.component.html',
})
export class FuncionarioAddComponent implements OnInit{
  editForm: UntypedFormGroup;
  isEditing = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private funcionariosService: FuncionarioService, 
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.editForm = this.formBuilder.group({
      idUser: [''],
      nome: [''],
      contato: [''],
      cpf: [''],
    });
  }

  close() {
    this.activeModal.close();  // Fechar o modal
  }

  save() {
    this.funcionariosService.createFuncionario(this.editForm.value).subscribe(
      (response) => {
        this.toastr.success('Funcionário criado com sucesso!', 'Sucesso');
        this.eventService.emitEvent("");
      },
      (error) => {
        console.error('Erro ao criar o funcionário:', error);
        this.toastr.error('Ocorreu um erro ao criar o funcionário.', 'Erro');
      }
    );
    this.activeModal.close();
  }

}
