import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { VendasComponent } from './vendas.component';
import { VendaAddComponent } from './vendas-add.component';

@Component({
  selector: 'app-venda-home',
  standalone: true,
  imports: [CommonModule, VendasComponent, VendaAddComponent],
  templateUrl: './vendas-home.component.html',
})
export class VendaHomeComponent implements OnInit, AfterViewInit{
  constructor(
    private modalService: NgbModal
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(){

  }

  addVenda() {
    this.modalService.open(VendaAddComponent);
  }

}
