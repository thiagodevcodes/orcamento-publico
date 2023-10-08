package br.com.thiago.orcamento.rest.form;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Data
public class SolicitanteForm {

    @NotEmpty
    @NotBlank
    @Size(max = 100)
    private String nome;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime dataCadastro;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime dataAlteracao;
}