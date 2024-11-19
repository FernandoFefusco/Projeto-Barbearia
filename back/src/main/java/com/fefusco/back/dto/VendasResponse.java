package com.fefusco.back.dto;

import com.fefusco.back.models.Clientes;
import com.fefusco.back.models.Funcionarios;
import com.fefusco.back.models.Servicos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VendasResponse {

    private Long idVenda;

    private Clientes cliente;

    private Funcionarios funcionario;

    private LocalDate dataVenda;

    private BigDecimal valorPago;

    private List<Servicos> servicos;
}