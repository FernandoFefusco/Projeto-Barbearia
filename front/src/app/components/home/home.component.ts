import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit{
  constructor(
  ) {}
  ngAfterViewInit(): void {
  }

  ngOnInit(){

  }

}
