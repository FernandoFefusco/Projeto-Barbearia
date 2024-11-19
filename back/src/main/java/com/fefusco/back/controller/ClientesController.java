package com.fefusco.back.controller;

import com.fefusco.back.models.Clientes;
import com.fefusco.back.service.ClientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin
public class ClientesController {

    @Autowired
    ClientesService clientesService;

    @PostMapping
    public Clientes createClientes(@RequestBody Clientes clientes) {
        return clientesService.createClientes(clientes);
    }

    @PutMapping
    public Clientes updateCliente(@RequestBody Clientes clientes) {
        return clientesService.updateClientes(clientes);
    }

    @DeleteMapping("/{idUser}")
    public ResponseEntity<Void> deleteClientes(@PathVariable Long idUser) {
        clientesService.deleteClientes(idUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Clientes> listAllClientes(){
        return clientesService.listaAllClientes();
    }

    @GetMapping("/id/{idUser}")
    public Optional<Clientes> listaClientes(@PathVariable Long idUser){
        return clientesService.listaClientes(idUser);
    }
}
