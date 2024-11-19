package com.fefusco.back.repository;

import com.fefusco.back.models.Servicos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicosRepository extends JpaRepository<Servicos, Long> {

    boolean existsByIdServico(Long idServico);

}