package com.fefusco.back.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class VendaServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVendaServico;

    private Long idVenda;

    private Long idServico;


}