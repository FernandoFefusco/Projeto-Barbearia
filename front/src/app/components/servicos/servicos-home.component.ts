import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ServicoAddComponent } from './servicos-add.component';
import { ServicosComponent } from './servicos.component';

@Component({
  selector: 'app-servico-home',
  standalone: true,
  imports: [CommonModule, ServicosComponent, ServicoAddComponent],
  templateUrl: './servicos-home.component.html',
})
export class ServicoHomeComponent implements OnInit, AfterViewInit{

  constructor(
    private modalService: NgbModal
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(){

  }

  addServico() {
    this.modalService.open(ServicoAddComponent);
  }

}
