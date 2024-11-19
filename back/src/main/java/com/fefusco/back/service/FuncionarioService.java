package com.fefusco.back.service;

import com.fefusco.back.models.Funcionarios;
import com.fefusco.back.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Informa ao spring que vai ser um serviço
public class FuncionarioService {

    @Autowired // Instanciando serviço de repository
    FuncionarioRepository funcionarioRepository;

    public Funcionarios createFuncionario(Funcionarios funcionarios) {
        return funcionarioRepository.save(funcionarios);
    }

    public Funcionarios updateFuncionario(Long idUser, Funcionarios funcionarios) {
        this.funcionarioRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("Funcionario não encontrado para o ID: " + idUser));

        return funcionarioRepository.save(funcionarios);
    }
    @Transactional
    public void deleteFuncionario(Long idUser) {
        funcionarioRepository.deleteById(idUser);
    }

    public List<Funcionarios> listaAllFuncionario() {
        return funcionarioRepository.findAll();
    }

    public Optional<Funcionarios> listaFuncionario(Long idUser) {
        return funcionarioRepository.findById(idUser);
    }
}
