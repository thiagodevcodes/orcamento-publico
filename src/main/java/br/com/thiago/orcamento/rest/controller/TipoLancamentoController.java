package br.com.thiago.orcamento.rest.controller;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import br.com.thiago.orcamento.rest.dto.TipoLancamentoDto;
import br.com.thiago.orcamento.rest.form.TipoLancamentoForm;
import br.com.thiago.orcamento.service.TipoLancamentoService;
import br.com.thiago.orcamento.service.exceptions.ConstraintException;

@RestController
@RequestMapping("/tipo-lancamento")
public class TipoLancamentoController {

    @Autowired
    TipoLancamentoService tipoLancamentoService;

    @GetMapping
    public ResponseEntity<Page<TipoLancamentoDto>> findAll(Pageable page) {
        Page<TipoLancamentoDto> tipoLancamentoDtoPage = tipoLancamentoService.findAll(page);
        return ResponseEntity.ok().body(tipoLancamentoDtoPage);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TipoLancamentoDto>> findAllData() {
        List<TipoLancamentoDto> tipoLancamentoDtoList = tipoLancamentoService.findAllData();
        return ResponseEntity.ok().body(tipoLancamentoDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoLancamentoDto> find(@PathVariable("id") Integer id) {
        TipoLancamentoDto tipoLancamentoDto = tipoLancamentoService.findById(id);
        return ResponseEntity.ok().body(tipoLancamentoDto);
    }

    @PostMapping
    public ResponseEntity<TipoLancamentoDto> insert(@Valid @RequestBody TipoLancamentoForm tipoLancamentoForm, BindingResult br) {
        List<String> errors = new ArrayList<>();
        
        if (br.hasErrors()) {
            br.getAllErrors().forEach(e -> {
                errors.add(e.getDefaultMessage());
            });
            throw new ConstraintException("Erro de Validação", errors);
        }

        TipoLancamentoDto tipoLancamentoDto = tipoLancamentoService.insert(tipoLancamentoForm);
        return ResponseEntity.ok().body(tipoLancamentoDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoLancamentoDto> update(@Valid @RequestBody TipoLancamentoForm tipoLancamentoForm
            , @PathVariable("id") Integer id, BindingResult br) {
        List<String> errors = new ArrayList<>();
        
        if (br.hasErrors()) {
            br.getAllErrors().forEach(e -> {
                errors.add(e.getDefaultMessage());
            });
            throw new ConstraintException("Erro de Validação", errors);
        }

        TipoLancamentoDto tipoLancamentoDto = tipoLancamentoService.updateById(tipoLancamentoForm, id);
        return ResponseEntity.ok().body(tipoLancamentoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        tipoLancamentoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
