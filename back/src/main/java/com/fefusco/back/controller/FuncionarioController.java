package com.fefusco.back.controller;

import com.fefusco.back.models.Funcionarios;
import com.fefusco.back.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funcionario")
@CrossOrigin
public class FuncionarioController {

    @Autowired
    FuncionarioService funcionarioService;

    @PostMapping
    public Funcionarios createFuncionario(@RequestBody Funcionarios funcionarios) {
        return funcionarioService.createFuncionario(funcionarios);
    }

    @PutMapping("/{idUser}")
    public Funcionarios updateFuncionario(@PathVariable Long idUser, @RequestBody Funcionarios funcionarios) {
        return funcionarioService.updateFuncionario(idUser, funcionarios);
    }

    @DeleteMapping("/{idUser}")
    public ResponseEntity<Void> deleteFuncionario(@PathVariable Long idUser) {
        funcionarioService.deleteFuncionario(idUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Funcionarios> listAllFuncionario(){
        return funcionarioService.listaAllFuncionario();
    }

    @GetMapping("/id/{idUser}")
    public Optional<Funcionarios> listaFuncionario(@PathVariable Long idUser){
        return funcionarioService.listaFuncionario(idUser);
    }
}
