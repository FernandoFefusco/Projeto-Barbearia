package com.fefusco.back.controller;

import com.fefusco.back.models.Servicos;
import com.fefusco.back.service.ServicosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos")
@CrossOrigin
public class ServicosController {

    @Autowired
    ServicosService servicosService;

    @PostMapping
    public Servicos createServicos(@RequestBody Servicos servicos) {
        return servicosService.createServicos(servicos);
    }

    @PutMapping
    public Servicos updateServicos(@RequestBody Servicos servicos) {
        return servicosService.updateServicos(servicos);
    }

    @DeleteMapping("/{idUser}")
    public ResponseEntity<Void> deleteServicos(@PathVariable Long idUser) {
        servicosService.deleteServicos(idUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Servicos> listAllServicos(){
        return servicosService.listaAllServicos();
    }

    @GetMapping("/id/{idUser}")
    public Optional<Servicos> listaServicos(@PathVariable Long idUser){
        return servicosService.listaServicos(idUser);
    }
}
