import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FaClipboard } from 'react-icons/fa';
import api from '../services/api';

function ConcluirTarefa(props) {
    const [modal, setModal] = useState(false);

    function handleModal(e) {
        e.preventDefault();
        setModal(true);
    }
    function handleCloseModal() {
        setModal(false);
    }

    async function handleConcluirTarefa(e) {
        e.preventDefault();
        try {
            await api.put(`/tarefas/${props.tarefa.id}/concluir`)
            setModal(true);
            props.carregarTarefas(true);
        } catch (error) {
            alert('Erro ao Deletar tarefa, por favor tente novamente em instantes');
        }

    }

    return (
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleModal}
                data-testid="btn-open-modal">
                <FaClipboard size={20} color="#fff" />
            </Button>
            <Modal show={modal} onHide={handleCloseModal} data-testid="modal">
                <Modal.Header>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                <br />
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa}
                        data-testid="btn-concluir">
                        Sim
                </Button>
                    <Button variant="light" onClick={handleCloseModal}
                        data-testid="btn-fechar-modal">
                        Não
                </Button>

                </Modal.Footer>
            </Modal>
        </span>
    );
}

ConcluirTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    carregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ConcluirTarefa;