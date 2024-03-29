import Table from "@/components/Table/Table";
import Layout from "@/components/Layout/Layout";
import Pagination from "@/components/Pagination/Pagination";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal/Modal";
import ModalUpdate from "@/components/ModalUpdate/ModalUpdate";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react"
import { fetchData, getAllData } from "@/services/axios";
import "react-toastify/dist/ReactToastify.css";
import InputForm from "@/components/InputForm/InputForm";
import styles from "../../styles/Lancamento.module.css";
import Select from "@/components/Select/Select";
import Checkbox from "@/components/Checkbox/Checkbox";
import Loading from "@/components/Loading/Loading";

export default function Lancamento() {
  const date = new Date()
  const [model, setModel] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState({})
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState({ post: false, update: false, delete: false });
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const columns = [
    { name: "Id", cod: "id" },
    { name: "Número", cod: "numeroLancamento" },
    { name: "Descrição", cod: "descricao" },
    { name: "Ged", cod: "ged" },
    { name: "Contratado", cod: "contratado" },
    { name: "Valor", cod: "valor" },
    { name: "Ano", cod: "anoOrcamento" },
  ]

  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');

  const dataFormatada = `${ano}-${mes}-${dia}`;
  let arrayAnos = []

  for (let index = 0; index < 30; index++) {
    arrayAnos.push(date.getFullYear() + index)
  }

  const controlModal = (modal, isOpen) => {
    setModalOpen({
      post: modal === "post" ? isOpen : false,
      update: modal === "update" ? isOpen : false,
      delete: modal === "delete" ? isOpen : false
    });
  };

  const handleSelectChange = (nameObject, e) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [nameObject]: e.target.value,
    }));
  };

  const handleCheckboxChange = (nameObject, novoValor) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [nameObject]: novoValor,
    }));
  };

  const handleInputChange = (nameObject, e) => {
    // Atualiza o estado com os valores dos inputs
    setFormData((prevValues) => ({
      ...prevValues,
      [nameObject]: e.target.value,
    }));
  };

  useEffect(() => {
    setLoading(false)
    fetchData(10, currentPage, "lancamento").then((response) => {
      setModel(response.content);
      setTotalPages(response.totalPages);
      setLoading(true)
    }).catch((error) => {
      console.error(error)
      setLoading(true);
    })
  }, [currentPage]);

  useEffect(() => {
    getAllData().then((response) => {
      setData(response)
    })
  }, [])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <Layout title="Orçamento Público">
      <Header controlModal={controlModal} title="Lançamentos" img="/icons/Unity.svg" />
      { model && loading && <Table columns={columns} model={model} controlModal={controlModal} setId={setId} title="lancamento" path="lancamento" />}
      
      { !loading && <Loading/> }

      {model.length == 0 ? null :
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      }

      {modalOpen.post ?
        <Modal title="Novo Lançamento" controlModal={controlModal} path={"lancamento"} formData={formData}>
          <div className={styles.containerSelect}>
            <Select model={data[0]} title={"Ação *"} onChange={(e) => handleSelectChange("acao", e)}  />
            <Select model={data[1]} title={"Elemento Despesa *"} onChange={(e) => handleSelectChange("elementoDespesa", e)}  />
            <Select model={data[2]} title={"Programa *"} onChange={(e) => handleSelectChange("programa", e)} />
          </div>

          <div className={styles.containerSelect}>
            <Select model={data[3]} title={"Unidade *"} onChange={(e) => handleSelectChange("unidade", e)} nameObject={"unidade"} />
            <Select model={data[4]} title={"Grupo Despesa *"} onChange={(e) => handleSelectChange("grupoDespesa", e)}  />
            <Select model={data[5]} title={"Unidade Orçamentária *"} onChange={(e) => handleSelectChange("unidadeOrcamentaria", e)} />
          </div>

          <div className={styles.containerSelect}>
            <Select model={data[6]} title={"Solicitante"} onChange={(e) => handleSelectChange("solicitante", e)} />
            <Select model={data[7]} title={"Tipo de Lançamento *"} onChange={(e) => handleSelectChange("tipoLancamento", e)} />
            <Select model={data[8]} title={"Tipo de Transação *"} onChange={(e) => handleSelectChange("tipoTransacao", e)} />
          </div>

          <div className={styles.containerSelect}>
            <Select model={data[9]} title={"Objetivo Estratégico"} onChange={(e) => handleSelectChange("objetivoEstrategico", e)} />
            <Select model={data[10]} title={"Fonte de Recurso *"} onChange={(e) => handleSelectChange("fonteRecurso", e)} />
            <Select model={data[11]} title={"Modalidade de Aplicação *"} onChange={(e) => handleSelectChange("modalidadeAplicacao", e)} />
          </div>

          <div className={styles.containerSelect}>
            <Select year={true} model={arrayAnos} title={"Ano Orçamento *"} onChange={(e) => handleSelectChange("anoOrcamento", e)} />
            <Select model={data[12]} title={"Lançamento Pai"} onChange={(e) => handleSelectChange("lancamentoPai", e)} value={formData.lancamentoPai} />
            <InputForm title={"Data Lançamento *"} type="date" onChange={(e) => handleInputChange("dataLancamento", e)} min={dataFormatada} />
          </div>

          <div className={styles.containerSelect}>
            <InputForm title={"Número Lançamento *"} type="number" onChange={(e) => handleInputChange("numeroLancamento", e)} />  
            <InputForm title={"Contratado *"} type="text" onChange={(e) => handleInputChange("contratado", e)}  />
            <InputForm title={"Descrição *"} type="text" onChange={(e) => handleInputChange("descricao", e)} />
          </div>

          <div className={styles.containerSelect}>
            <InputForm title={"Valor *"} type="number" onChange={(e) => handleInputChange("valor", e)} />
            <InputForm title={"GED *"} type="text" onChange={(e) => handleInputChange("ged", e)} />
            <Checkbox title={"Lançamento Inválido *"} onChange={handleCheckboxChange} />
          </div>
        </Modal>
        : modalOpen.update ?
          <ModalUpdate setFormData={setFormData} model={model} id={id} title="Editar Lançamento" controlModal={controlModal} path={"lancamento"} formData={formData}>
            <div className={styles.containerSelect}>
              <Select defaultValue={formData.acao} id={id} model={data[0]} title={"Ação *"} onChange={(e) => handleSelectChange("acao", e)} />
              <Select defaultValue={formData.elementoDespesa} model={data[1]} title={"Elemento Despesa *"} onChange={(e) => handleInputChange("elementoDespesa", e)} />
              <Select defaultValue={formData.programa} model={data[2]} title={"Programa *"} onChange={(e) => handleInputChange("programa", e)} />
            </div>

            <div className={styles.containerSelect}>
              <Select defaultValue={formData.unidade} model={data[3]} title={"Unidade *"} onChange={(e) => handleInputChange("unidade", e)} />
              <Select defaultValue={formData.grupoDespesa} model={data[4]} title={"Grupo Despesa *"} onChange={(e) => handleInputChange("grupoDespesa", e)} />
              <Select defaultValue={formData.unidadeOrcamentaria} model={data[5]} title={"Unidade Orçamentária *"} onChange={(e) => handleInputChange("unidadeOrcamentaria", e)} />
            </div>

            <div className={styles.containerSelect}>
              <Select defaultValue={formData.solicitante} model={data[6]} title={"Solicitante"} onChange={(e) => handleInputChange("solicitante", e)} />
              <Select defaultValue={formData.tipoLancamento} model={data[7]} title={"Tipo de Lançamento *"} onChange={(e) => handleInputChange("tipoLancamento", e)} />
              <Select defaultValue={formData.tipoTransacao} model={data[8]} title={"Tipo de Transação *"} onChange={(e) => handleInputChange("tipoTransacao", e)} />
            </div>

            <div className={styles.containerSelect}>
              <Select defaultValue={formData.objetivoEstrategico} model={data[9]} title={"Objetivo Estratégico"} onChange={(e) => handleInputChange("objetivoEstrategico", e)} />
              <Select defaultValue={formData.fonteRecurso} model={data[10]} title={"Fonte de Recurso *"} onChange={(e) => handleInputChange("fonteRecurso", e)} />
              <Select defaultValue={formData.modalidadeAplicacao} model={data[11]} title={"Modalidade de Aplicação *"} onChange={(e) => handleInputChange("modalidadeAplicacao", e)} />
            </div>

            <div className={styles.containerSelect}>
              <Select year={true} title={"Ano Orçamento *"} onChange={(e) => handleSelectChange("anoOrcamento", e)} />
              <Select defaultValue={formData.lancamentoPai} model={data[12]} title={"Lançamento Pai"} onChange={(e) => handleInputChange("lancamentoPai", e)} />
              <InputForm value={formData.dataLancamento} title={"Data Lançamento *"} type="date" onChange={(e) => handleInputChange("dataLancamento", e)} />
            </div>

            <div className={styles.containerSelect}>
              <InputForm value={formData.numeroLancamento} title={"Número Lançamento *"} type="number" onChange={(e) => handleInputChange("numeroLancamento", e)} />
              <InputForm value={formData.contratado} title={"Contratado *"} type="text" onChange={(e) => handleInputChange("contratado", e)} />
              <InputForm value={formData.descricao} title={"Descrição *"} type="text" onChange={(e) => handleInputChange("descricao", e)} />
            </div>

            <div className={styles.containerSelect}>
              <InputForm value={formData.valor} title={"Valor *"} type="number" onChange={(e) => handleInputChange("valor", e)} />
              <InputForm value={formData.ged} title={"GED *"} type="text" onChange={(e) => handleInputChange("ged", e)} />
              <Checkbox value={formData.lancamentoInvalido} title={"Lançamento Inválido *"} onChange={handleCheckboxChange} />
            </div>
          </ModalUpdate>
          : null}

      {modalOpen.delete ?
        <ModalDelete path="lancamento" id={id} controlModal={controlModal} title={"Confirmar Exclusão?"}></ModalDelete>
        : null
      }
      <ToastContainer />
    </Layout>
  )
}