import { Cliente } from "./cliente.models";
import { Funcionario } from "./funcionario.models";
import { Servico } from "./servico.models";

export interface Venda {
  idVenda: number;
  cliente: Cliente;
  funcionario: Funcionario;
  dataVenda: Date;
  valorPago: number;
  servicos: Servico[];
  }