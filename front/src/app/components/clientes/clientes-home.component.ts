import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientesComponent } from './clientes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteAddComponent } from './clientes-add.component';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [CommonModule, ClientesComponent, ClienteAddComponent, RouterModule],
  templateUrl: './clientes-home.component.html',
})
export class ClienteHomeComponent implements OnInit, AfterViewInit{

  constructor(
    private modalService: NgbModal,
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(){

  }

  addCliente() {
    this.modalService.open(ClienteAddComponent);
  }

}
