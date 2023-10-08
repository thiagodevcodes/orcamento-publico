package br.com.thiago.orcamento.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="Solicitante")

public class SolicitanteModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 200, nullable = false)
    private String nome;

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "dataAlteracao")
    private LocalDateTime dataAlteracao;
}
