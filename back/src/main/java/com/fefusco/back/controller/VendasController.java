package com.fefusco.back.controller;

import com.fefusco.back.dto.VendasDTO;
import com.fefusco.back.dto.VendasResponse;
import com.fefusco.back.service.VendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin
public class VendasController {

    @Autowired
    VendasService vendasService;

    @PostMapping
    public VendasResponse createVendas(@RequestBody VendasDTO vendas) {
        return vendasService.createVendas(vendas);
    }

    @PutMapping("/{idVenda}")
    public VendasResponse updateVendas(@PathVariable Long idVenda, @RequestBody VendasDTO vendas) {
        return vendasService.updateVendas(idVenda, vendas);
    }

    @DeleteMapping("/{idVenda}")
    public ResponseEntity<Void> deleteVendas(@PathVariable Long idVenda) {
        vendasService.deleteVendas(idVenda);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<VendasResponse> listAllVendas(){
        return vendasService.listaAllVendas();
    }

    @GetMapping("/id/{idVenda}")
    public Optional<VendasResponse> listaVendaById(@PathVariable Long idVenda){
        return vendasService.listaVendaById(idVenda);
    }
}
