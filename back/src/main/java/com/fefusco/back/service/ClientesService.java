package com.fefusco.back.service;

import com.fefusco.back.models.Clientes;
import com.fefusco.back.repository.ClientesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientesService {

    @Autowired
    ClientesRepository clientesRepository;

    public Clientes createClientes(Clientes clientes) {
        return clientesRepository.save(clientes);
    }

    public Clientes updateClientes(Clientes clientes) {
        return clientesRepository.save(clientes);
    }

    @Transactional
    public void deleteClientes(Long idUser) {
        clientesRepository.deleteById(idUser);
    }

    public List<Clientes> listaAllClientes() {
        return clientesRepository.findAll();
    }

    public Optional<Clientes> listaClientes(Long idUser) {
        return clientesRepository.findById(idUser);
    }
}
