import Table from "@/components/Table";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import ModalUpdate from "@/components/ModalUpdate";
import { fetchData } from "@/services/axios";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react"
import "react-toastify/dist/ReactToastify.css";

export default function Solicitante() {
    const [model, setModel] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [modalOpen, setModalOpen] = useState({ post: false, update: false });
    const [id, setId] = useState(null);
  
    const controlModal = (modal, isOpen) => {
      setModalOpen({
        post: modal === "post" ? isOpen : false,
        update: modal === "update" ? isOpen : false
      });
    };
  
    useEffect(() => {
      fetchData(10, currentPage, "solicitante").then((response) => {
        setModel(response.content);
        setTotalPages(response.totalPages);
      }).catch((error) => {
        console.error(error)
      })
    }, [currentPage]);
      
    return (
      <Layout title="Orçamento Público">
        <Header controlModal={controlModal} title="Solicitantes"/>
        <Table model={model} controlModal={controlModal} setId={setId} title="solicitante" path="solicitante"/>
          
        {model.length == 0 ? null : 
          <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        }

        {modalOpen.post && <Modal model={model} title="Adicionar Solicitante" controlModal={controlModal} path="solicitante" />}
        {modalOpen.update && <ModalUpdate model={model} id={id} title="Editar Solicitante" controlModal={controlModal} path="solicitante" />}
        <ToastContainer/>
      </Layout>
    )
  }