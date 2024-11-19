package com.fefusco.back.repository;

import com.fefusco.back.models.Clientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientesRepository extends JpaRepository<Clientes, Long> {

    boolean existsByIdUser(Long idCliente);
}