package br.com.thiago.orcamento.model;

import lombok.Data;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="lancamentos")
public class LancamentoModel {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descricao", length = 255, nullable = false)
    private String descricao;

    @Column(name = "numero_lancamento")
    private Integer numeroLancamento;

    @Column(name = "data_lancamento", nullable = false)
    private LocalDate dataLancamento;

    @Column(name = "lancamento_invalido", nullable = false)
    private Boolean lancamentoInvalido;

    @Column(name = "contratado", length = 255)
    private String contratado;

    @Column(name = "ged", length = 27)
    private String ged;

    @Column(name = "ano_orcamento", nullable = false)
    private Short anoOrcamento;

    @Column(name = "valor", length = 4, nullable = false)
    private Float valor;

    @Column(name = "id_tipo_lancamento", nullable = false)
    private Integer tipoLancamento;

    @Column(name = "id_lancamento_pai")
    private Integer lancamentoPai;
    
    @Column(name = "id_unidade", nullable = false)
    private Integer unidade;

    @Column(name = "id_unidadeOrcamentaria", nullable = false)
    private Integer unidadeOrcamentaria;
 
    @Column(name = "id_programa", nullable = false)
    private Integer programa;

    @Column(name = "id_acao", nullable = false)
    private Integer acao;

    @Column(name = "id_fonte_recurso", nullable = false)
    private Integer fonteRecurso;

    @Column(name = "id_grupo_despesa", nullable = false)
    private Integer grupoDespesa;

    @Column(name = "id_modalidade_aplicacao", nullable = false)
    private Integer modalidadeAplicacao;

    @Column(name = "id_elemento_despesa", nullable = false)
    private Integer elementoDespesa;

    @Column(name = "id_solicitante")
    private Integer solicitante;

    @Column(name = "id_objetivo_estrategico")
    private Integer objetivoEstrategico;

    @Column(name = "id_tipo_transacao", nullable = false)
    private Integer tipoTransacao;

    @CreationTimestamp
    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @UpdateTimestamp
    @Column(name = "data_alteracao")
    private LocalDateTime dataAlteracao;
}