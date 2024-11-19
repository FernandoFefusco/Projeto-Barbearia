package com.fefusco.back.service;

import com.fefusco.back.dto.VendasDTO;
import com.fefusco.back.dto.VendasResponse;
import com.fefusco.back.models.*;
import com.fefusco.back.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VendasService {

    @Autowired
    VendasRepository vendasRepository;

    @Autowired
    ServicosRepository servicosRepository;

    @Autowired
    ClientesRepository clientesRepository;

    @Autowired
    VendaServicoRepository vendaServicoRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    public VendasResponse createVendas(VendasDTO vendas) {

        validaVenda(vendas); // CHAMA METODO QUE VAI VALIDAR SE EXISTE CLIENTE E SERVICO CADASTRADOS

        Vendas entity = buildaToEntity(vendas); // CHAMA METODO QUE FAZ O BUILD DA VENDA, SETANDO A DATA DA VENDA E PASSANDO OS ATRIBUTOS PARA A CLASSE ENTITY QUE O REPOSITORY NECESSITA PARA SALVAR NO BANCO DE DADOS

        Vendas salvo = vendasRepository.save(entity); // SALVA NA TABELA VENDAS

        vendas.getIdServico().forEach(servicos -> {
            VendaServico vendaServico = new VendaServico(); // INSTANCIA DA TABELA VENDA_SERVICO
            vendaServico.setIdServico(servicos); // CASO ENCONTRE, SETA O ID_SERVICO E ID_VENDA DENTRO DA TABELA SERVICO_VENDA
            vendaServico.setIdVenda(salvo.getIdVenda()); // PEGA O ID VENDA DO QUE FOI SALVO
            vendaServicoRepository.save(vendaServico); // SALVA NA TABELA SERVICO_VENDAS
        });

        return buildaToResponse(salvo); // RETORNA A INFORMACAO SALVA NO BANCO DA TABELA VENDAS.
    }

    private static Vendas buildaToEntity(VendasDTO vendas) {
        Vendas entity = new Vendas(); // INSTANCIA A CLASSE VENDAS (TABELA)
        BeanUtils.copyProperties(vendas, entity); // COPIA OS DADOS DA CLASSE AUXILIAR VENDAS (DTO) PARA A CLASSE VENDAS (TABELA) PARA SALVAR
        entity.setDataVenda(LocalDate.now()); // SALVANDO DATA ATUAL
        return entity;
    }

    private void validaVenda(VendasDTO vendas) {
        boolean isExisteCliente = clientesRepository.existsByIdUser(vendas.getIdCliente()); // VERIFICA NO BANCO SE EXISTE ID_CLIENTE REGSITRADO, RETORNA TRUE OU FASE.
        if(!isExisteCliente){ // VALIDA SE TRUE OU FALSE
            throw new IllegalArgumentException("Cliente nao existe"); // ESTOURA ERRO CASO NAO EXISTA.
        }

        vendas.getIdServico().forEach(servico -> { // PERCORRENDO LISTA DE ID_SERVICOS PASSADO PELA A REQUISICAO
            boolean isExisteServico = servicosRepository.existsByIdServico(servico); // VERIFICANDO NO BANCO SE EXISTE O ID_SERVICO REGISTRADO, RETORNA TRUE OU FALSE
            if(!isExisteServico){ // VALIDA SE TRUE OU FALSE
                throw new IllegalArgumentException("Servico nao existe"); // ESTOURA ERRO CASO NAO EXISTA.
            }
        });
    }

    @Transactional
    public VendasResponse updateVendas(Long idVenda, VendasDTO vendasDTO) {
        // Busca a venda pelo ID e lança uma exceção se não for encontrada
        this.vendasRepository.findById(idVenda)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada para o ID: " + idVenda));

        // Valida se existem cliente e serviço cadastrados
        validaVenda(vendasDTO);

        // Constrói a entidade Vendas com os dados do DTO
        Vendas entity = buildaToEntity(vendasDTO);

        // Salva a venda atualizada na tabela de Vendas
        Vendas salvo = vendasRepository.save(entity);

        this.vendaServicoRepository.deleteByIdVenda(idVenda);

        // Percorre sobre os IDs de serviço fornecidos no request
        vendasDTO.getIdServico().forEach(servicos -> {
            // Verifica se já existe um vínculo de venda e serviço na tabela VENDA_SERVICO
            this.vendaServicoRepository.findByIdVendaAndIdServico(vendasDTO.getIdVenda(), servicos).ifPresentOrElse(
                    vendaServico -> {
                        // Caso exista, apenas salva a entidade existente
                        this.vendaServicoRepository.save(vendaServico);
                    },
                    () -> {
                        // Caso não exista, cria uma nova entidade e salva
                        VendaServico vendaServico = new VendaServico();
                        vendaServico.setIdServico(servicos);
                        vendaServico.setIdVenda(salvo.getIdVenda());
                        vendaServicoRepository.save(vendaServico);
                    }
            );
        });

        return buildaToResponse(salvo); // Retorna a venda atualizada
    }

    @Transactional
    public void deleteVendas(Long idVenda) {
        // Busca a venda pelo ID e lança uma exceção se não for encontrada
        this.vendasRepository.findById(idVenda).orElseThrow(() -> new RuntimeException("Venda não encontrada para o ID: " + idVenda));

        // DELETA SERVICOS ASSOCIADOS A VENDA ANTES DE EXCLUIR A VENDA
        this.vendaServicoRepository.deleteByIdVenda(idVenda);

        // DELETA A VENDA
        vendasRepository.deleteById(idVenda);
    }

    public List<VendasResponse> listaAllVendas() {
        return vendasRepository.findAll().stream()
                .map(this::buildaToResponse)
                .collect(Collectors.toList());
    }

    private VendasResponse buildaToResponse(Vendas venda) {
        return VendasResponse.builder()
                .idVenda(venda.getIdVenda())
                .cliente(getCliente(venda))
                .funcionario(getFuncionario(venda))
                .dataVenda(venda.getDataVenda())
                .valorPago(venda.getValorPago())
                .servicos(getServicos(venda))
                .build();
    }

    private List<Servicos> getServicos(Vendas venda) {
        return vendaServicoRepository.findByIdVenda(venda.getIdVenda()).stream()
                .map(vendaServico -> servicosRepository.findById(vendaServico.getIdServico()))
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
    }

    private Clientes getCliente(Vendas venda) {
        return clientesRepository.findById(venda.getIdCliente()).orElseThrow(() -> new RuntimeException("Cliente não encontrado para o ID: " + venda.getIdVenda()));
    }

    private Funcionarios getFuncionario(Vendas venda) {
        return funcionarioRepository.findById(venda.getIdFuncionario()).orElseThrow(() -> new RuntimeException("Funcionario não encontrado para o ID: " + venda.getIdVenda()));
    }

    public Optional<VendasResponse> listaVendaById(Long idVenda) {
        return vendasRepository.findById(idVenda).map(this::buildaToResponse);
    }
}
