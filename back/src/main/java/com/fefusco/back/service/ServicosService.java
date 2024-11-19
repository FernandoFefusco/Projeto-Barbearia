package com.fefusco.back.service;

import com.fefusco.back.models.Servicos;
import com.fefusco.back.repository.ServicosRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicosService {

    @Autowired
    ServicosRepository servicosRepository;

    public Servicos createServicos(Servicos servicos) {
        return servicosRepository.save(servicos);
    }

    public Servicos updateServicos(Servicos servicos) {
        return servicosRepository.save(servicos);
    }

    @Transactional
    public void deleteServicos(Long idUser) {
        servicosRepository.deleteById(idUser);
    }

    public List<Servicos> listaAllServicos() {
        return servicosRepository.findAll();
    }

    public Optional<Servicos> listaServicos(Long idUser) {
        return servicosRepository.findById(idUser);
    }
}
