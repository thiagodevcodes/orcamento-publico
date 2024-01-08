import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDataById } from "@/services/axios";
import "react-toastify/dist/ReactToastify.css";

export default function AcaoById() {
  const router = useRouter();
  const [acao, setAcao] = useState({});
  const id = router.query.id;

  useEffect( () => {
    if(id) {
      fetchDataById(id, "acao").then((response) => {
        setAcao(response);
    }).catch((error) => {
        console.error(error)
    })
    }
  }, [id])

  if (!acao) {
      return <div>Ação não encontrada</div>;
  }

  return (
      <Layout>
          <p>Id: {acao.id}</p>
          <p>Nome: {acao.nome}</p>
          <p>Código: {acao.codigo}</p>
      </Layout>
  );
};




