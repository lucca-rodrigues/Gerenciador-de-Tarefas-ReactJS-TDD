import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import {FaTrash} from 'react-icons/fa';
import api from '../services/api'; 

function Removertarefas(props) {
    const [modal, setModal] = useState(false);

    function handleOpenModal(e){
        e.preventDefault();
        setModal(true);
    }

    function handleCloseModal(e){
        e.preventDefault();
        setModal(false);
    }

    async function handleExcluirTarefa(e){
        e.preventDefault();
        try {
            await api.delete('/tarefas/' + props.tarefa.id);
            setModal(false);
            props.carregarTarefas(true);
        } catch (error) {
            setModal(false);
        }
    }
    
  return (
      <span>
          <Button variant="danger"
          className="btn-sm"
          onClick={handleOpenModal}
          data-testid="btn-abrir-modal"
          >
            <FaTrash size={20} color="#fff"/>  
          </Button>
          <Modal show={modal} onHide={handleCloseModal} data-testid="modal">
            <Modal.Header>
                <Modal.Title>Concluir Tarefa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Deseja realmente concluir a seguinte tarefa?
                <br/>
                <strong>{props.tarefa.nome}</strong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleExcluirTarefa}
                    data-testid="btn-excluir">
                    Sim
                </Button>                
                <Button variant="light" onClick={handleCloseModal}
                    data-testid="btn-fechar-modal">
                    Não
                </Button>

            </Modal.Footer>
          </Modal>
      </span>
  )
}

Removertarefas.propTypes = {
    tarefa: PropTypes.object.isRequired,
    carregarTarefa: PropTypes.func.isRequired
}

export default Removertarefas;