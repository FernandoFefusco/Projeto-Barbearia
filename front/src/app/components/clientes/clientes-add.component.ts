import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-clientes-add',
  standalone: true,
  imports: [CommonModule, NgbModalModule, FormsModule, ReactiveFormsModule ],  // Verifique se está usando .forRoot()
  templateUrl: './clientes-add.component.html',
})
export class ClienteAddComponent implements OnInit{
  editForm: UntypedFormGroup;
  isEditing = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private clienteService: ClienteService, 
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
    this.clienteService.createCliente(this.editForm.value).subscribe(
      (response) => {
        this.toastr.success('Cliente criado com sucesso!', 'Sucesso');
        this.eventService.emitEvent("");
      },
      (error) => {
        console.error('Erro ao criar o cliente:', error);
        this.toastr.error('Ocorreu um erro ao criar o cliente.', 'Erro');
      }
    );
    this.activeModal.close();
  }

}
