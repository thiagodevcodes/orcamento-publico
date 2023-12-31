package br.com.thiago.orcamento.repository;

import br.com.thiago.orcamento.model.UnidadeModel;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnidadeRepository extends JpaRepository<UnidadeModel, Integer> {
    Optional<UnidadeModel> findByNome(String nome);

    List<UnidadeModel> findAllByOrderByIdAsc(Pageable pageable);
}
