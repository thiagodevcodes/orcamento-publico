import Table from "@/components/Table/Table";
import Layout from "@/components/Layout/Layout";
import Pagination from "@/components/Pagination/Pagination";
import Header from "@/components/Header/Header";
import Modal from "@/components/Modal/Modal";
import ModalUpdate from "@/components/ModalUpdate/ModalUpdate";
import ModalDelete from "@/components/ModalDelete/ModalDelete";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react"
import { fetchData } from "@/services/axios";
import "react-toastify/dist/ReactToastify.css";
import InputForm from "@/components/InputForm/InputForm";
import Loading from "@/components/Loading/Loading";

export default function ObjetivoEstrategico() {
  const [model, setModel] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState({ post: false, update: false, delete: false });
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({ codigo: "" });
  const [loading, setLoading] = useState(false)

  const columns = [
    { name: "Id", cod: "id" },
    { name: "Nome", cod: "nome" }
  ]

  const handleInputChange = (column, event) => {
    setFormData({
      ...formData,
      [column]: event.target.value,
    });
  };

  const controlModal = (modal, isOpen) => {
    setModalOpen({
      post: modal === "post" ? isOpen : false,
      update: modal === "update" ? isOpen : false,
      delete: modal === "delete" ? isOpen : false
    });
  };

  useEffect(() => {
    setLoading(false)
    fetchData(10, currentPage, "objetivo-estrategico").then((response) => {
      setModel(response.content);
      setTotalPages(response.totalPages);
      setLoading(true)
    }).catch((error) => {
      console.error(error)
      setLoading(true);
    })
  }, [currentPage]);

  useEffect(() => {
    if (modalOpen.update == false)
      setFormData({ nome: "" })
  }, [modalOpen.update])

  return (
    <Layout title="Orçamento Público">
      <Header controlModal={controlModal} title="Objetivos Estratégicos" img="/icons/Strategy.svg" />
      { loading && model && <Table columns={columns} model={model} controlModal={controlModal} setId={setId} title="objetivo-estrategico" path="objetivo-estrategico" />}

      { !loading && <Loading/> }

      {model.length == 0 ? null :
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      }

      {modalOpen.post ?
        <Modal title="Adicionar" controlModal={controlModal} path={"objetivo-estrategico"} formData={formData}>
          <InputForm
            key={"nome"}
            id={"nome"}
            type={"text"}
            title={"Nome"}
            htmlFor={"nome"}
            onChange={(e) => handleInputChange("nome", e)}
          >
          </InputForm>
        </Modal>
        : modalOpen.update ?
          <ModalUpdate setFormData={setFormData} model={model} id={id} title="Editar" controlModal={controlModal} path={"objetivo-estrategico"} formData={formData}>
            <InputForm
              key={"nome"}
              id={"nome"}
              type={"text"}
              title={"Nome"}
              htmlFor={"Nome"}
              onChange={(e) => handleInputChange("nome", e)}
              value={formData.nome}
            >
            </InputForm>
          </ModalUpdate>
          : null}
      {modalOpen.delete ?
        <ModalDelete path="objetivo-estrategico" id={id} controlModal={controlModal} title={"Confirmar Exclusão?"}></ModalDelete>
        : null
      }
      <ToastContainer />
    </Layout>
  )
}