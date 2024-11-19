package com.fefusco.back.repository;

import com.fefusco.back.models.VendaServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendaServicoRepository extends JpaRepository<VendaServico, Long> {

    Optional<VendaServico> findByIdVendaAndIdServico(Long pIdVenda, Long pIdServico);

    List<VendaServico> findByIdVenda(Long pIdVenda);

    void deleteByIdVenda(Long pIdVenda);
}