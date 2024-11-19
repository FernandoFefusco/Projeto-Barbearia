import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FuncionarioHomeComponent } from './components/funcionarios/funcionarios-home.component';
import { ClienteHomeComponent } from './components/clientes/clientes-home.component';
import { ServicoHomeComponent } from './components/servicos/servicos-home.component';
import { VendaHomeComponent } from './components/vendas/vendas-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { path: 'home', component: HomeComponent, pathMatch:'full' },
  { path: 'funcionarios', component: FuncionarioHomeComponent, pathMatch:'full' },
  { path: 'clientes', component: ClienteHomeComponent, pathMatch:'full' },
  { path: 'servicos', component: ServicoHomeComponent, pathMatch:'full' },
  { path: 'vendas', component: VendaHomeComponent, pathMatch:'full' },

];
