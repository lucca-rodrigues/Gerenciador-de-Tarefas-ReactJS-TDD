import React, {useState, useEffect} from 'react';
import { A } from 'hookrouter';
import {Table, Form} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import { toast } from 'react-toastify';
import api from '.././services/api';

function ListarTarefas() {

  const ITENS_POR_PAG = 3;

  const [tarefas, setTarefas] = useState([]);
  const [carregarTarefas, setCarregarTarefas] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [orderAsc, setOrderAsc] = useState(false);
  const [orderDesc, setOrderDesc] = useState(false);
  const [filtroTarefas, setFiltroTarefas] = useState('');
  
  useEffect(() => {
    async function obterTarefas(){
      let ordem = '';
      if(orderAsc){
        ordem = 'ASC'
      } else if (orderDesc){
        ordem ='DESC'
      }
      try {
        const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefas=${filtroTarefas}`
        let {data} = await api.get('/tarefas' + params);
        setTotalItems(data.totalItems);
        setTarefas(data.tarefas);
      } catch(err){
        toast.error('Erro ao requisitar dados da API.');
        alert('Erro ao requisitar dados da API.');
      }
    }

    if(carregarTarefas){
      obterTarefas();
      setCarregarTarefas(false); // Evita o Carregamento da tarefa novamente sem ter acontecido nenhuma alteração
    }
  }, [carregarTarefas, paginaAtual, orderAsc, orderDesc, filtroTarefas]);
  
  function handleMudarPagina(pagina){
    setPaginaAtual(pagina); 
    setCarregarTarefas(true);
  }

  function handleOrdenarTarefas(e){
    e.preventDefault();
    if (!orderAsc && !orderDesc) {
      setOrderAsc(true);
      setOrderDesc(false);
    } else if (orderAsc) {
      setOrderAsc(false);
      setOrderDesc(true);
    } else {
      setOrderAsc(false);
      setOrderDesc(false);
    }
    setCarregarTarefas(true);
  }

  function handleFiltrar(e){
    setFiltroTarefas(e.target.value);
    setCarregarTarefas(true);
  }

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="tabela" >
        <thead>
          <tr>
          <th>
              <a href="/" onClick={handleOrdenarTarefas}>
                Tarefa
                &nbsp;
                <Ordenacao
                  orderAsc={orderAsc}
                  orderDesc={orderDesc} />
              </a>
            </th>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefas}
                onChange={handleFiltrar}
                data-testid="pesquisar-tarefa"
                placeholder="Pesquisar tarefas"
              />
            </th>
            <th className="text-right">
              <A href="/cadastrar"
              className="btn btn-success">
                <FaPlus size={20}/> Nova tarefa
              </A>
            </th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas 
            tarefas={tarefas}
            carregarTarefas={setCarregarTarefas}
          />
        </tbody>
      </Table>
      <div>
        <Paginacao 
          totalItems={totalItems}
          itemsPorPagina={ITENS_POR_PAG}
          paginaAtual={paginaAtual}
          mudarPagina={handleMudarPagina}
        />
      </div>
    </div>
  );
}

export default ListarTarefas;