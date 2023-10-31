package br.com.thiago.orcamento.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TipoLancamentoDto {
    private Integer id;
    private String nome;
}
