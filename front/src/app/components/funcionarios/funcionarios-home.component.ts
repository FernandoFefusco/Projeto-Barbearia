import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FuncionarioComponent } from './funcionarios.component';
import { FuncionarioAddComponent } from './funcionarios-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-home',
  standalone: true,
  imports: [CommonModule, FuncionarioComponent, FuncionarioAddComponent, RouterModule],
  templateUrl: './funcionarios-home.component.html',
})
export class FuncionarioHomeComponent implements OnInit, AfterViewInit{

  constructor(
    private modalService: NgbModal
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(){

  }

  addFuncionario() {
    this.modalService.open(FuncionarioAddComponent);
  }

}
