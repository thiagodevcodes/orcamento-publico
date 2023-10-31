package br.com.thiago.orcamento.rest.controller;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import br.com.thiago.orcamento.rest.dto.ObjetivoEstrategicoDto;
import br.com.thiago.orcamento.rest.form.ObjetivoEstrategicoForm;
import br.com.thiago.orcamento.rest.form.ObjetivoEstrategicoUpdateForm;
import br.com.thiago.orcamento.service.ObjetivoEstrategicoService;
import br.com.thiago.orcamento.service.exceptions.ConstraintException;

@RestController
@RequestMapping("/objetivo-estrategico")
public class ObjetivoEstrategicoController {

    @Autowired
    ObjetivoEstrategicoService objetivoEstrategicoService;

    @GetMapping
    public ResponseEntity<List<ObjetivoEstrategicoDto>> findAll() {
        List<ObjetivoEstrategicoDto> objetivoEstrategicoDtoList = objetivoEstrategicoService.findAll();
        return ResponseEntity.ok().body(objetivoEstrategicoDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObjetivoEstrategicoDto> find(@PathVariable("id") Integer id) {
        ObjetivoEstrategicoDto objetivoEstrategicoDto = objetivoEstrategicoService.findById(id);
        return ResponseEntity.ok().body(objetivoEstrategicoDto);
    }

    @PostMapping
    public ResponseEntity<ObjetivoEstrategicoDto> insert(@Valid @RequestBody ObjetivoEstrategicoForm objetivoEstrategicoForm, BindingResult br) {
        List<String> errors = new ArrayList<>();
        
        if (br.hasErrors()) {
            br.getAllErrors().forEach(e -> {
                errors.add(e.getDefaultMessage());
            });
            throw new ConstraintException("Erro de Validação", errors);
        }

        ObjetivoEstrategicoDto objetivoEstrategicoDto = objetivoEstrategicoService.insert(objetivoEstrategicoForm);
        return ResponseEntity.ok().body(objetivoEstrategicoDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObjetivoEstrategicoDto> update(@Valid @RequestBody
        ObjetivoEstrategicoUpdateForm objetivoEstrategicoUpdateForm, @PathVariable("id") Integer id, BindingResult br) {
        List<String> errors = new ArrayList<>();
        
        if (br.hasErrors()) {
            br.getAllErrors().forEach(e -> {
                errors.add(e.getDefaultMessage());
            });
            throw new ConstraintException("Erro de Validação", errors);
        }

        ObjetivoEstrategicoDto objetivoEstrategicoDto = objetivoEstrategicoService.updateById(objetivoEstrategicoUpdateForm, id);
        return ResponseEntity.ok().body(objetivoEstrategicoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        objetivoEstrategicoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
