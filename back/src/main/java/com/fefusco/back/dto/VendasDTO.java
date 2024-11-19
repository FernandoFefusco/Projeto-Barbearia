package com.fefusco.back.dto;

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
public class VendasDTO {

    private Long idVenda;

    private Long idCliente;

    private Long idFuncionario;

    private LocalDate dataVenda;

    private BigDecimal valorPago;

    private List<Long> idServico;
}