CREATE DATABASE IF NOT EXISTS edbarber01;

USE edbarber01;

CREATE TABLE IF NOT EXISTS funcionarios (
  id_user BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  contato VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
  id_user BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  contato VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS servicos (
  id_servico INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(50) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS vendas (
  id_venda BIGINT PRIMARY KEY AUTO_INCREMENT,
  id_cliente BIGINT,
  id_funcionario BIGINT,
  id_servico INT,
  data_venda DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valor_pago DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_user),
  FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_user),
  FOREIGN KEY (id_servico) REFERENCES servicos(id_servico)
);

CREATE TABLE IF NOT EXISTS venda_servico (
  id_venda_servico BIGINT PRIMARY KEY AUTO_INCREMENT,
  id_venda BIGINT,
  id_servico INT,
  FOREIGN KEY (id_venda) REFERENCES vendas(id_venda) ON DELETE CASCADE,
  FOREIGN KEY (id_servico) REFERENCES servicos(id_servico) ON DELETE CASCADE,
  UNIQUE (id_venda, id_servico)
);