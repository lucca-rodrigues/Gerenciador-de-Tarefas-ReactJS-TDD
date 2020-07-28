import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import api from '../services/api';
import Tarefa from '../Models/tarefa.model';

function AtualizarTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [tarefa, setTarefa] = useState('');
  const [carregarDadosTarefa, setCarregarDadosTarefa] = useState(true);

  useEffect(() => {
    async function obterTarefa(){
      try{
        let {data} = await api.get('/tarefas/' + props.id);
        setTarefa(data.nome);
      }catch(err){
        alert('Erro ao Requisitar dados da API.');
        navigate('/');
      }
    }
    if (carregarDadosTarefa) {
      obterTarefa();
      setCarregarDadosTarefa(false);
    }
  }, [carregarDadosTarefa, props]);

  function voltar(e) {
    e.preventDefault();
    navigate('/');
  }

  function handleFecharModal() {
    navigate('/');
  }

  async function atualizar(e) {
    e.preventDefault();
    setFormValidado(true);
    if (e.currentTarget.checkValidity() === true) {
      try{
        const atualizarTarefa = new Tarefa(null, tarefa, false);
        await api.put('/tarefas/' + props.id, atualizarTarefa);
        setExibirModal(true);
      }catch(err){  
        alert('Erro ao cadastrar tarefa, tente novamente em alguns instantes');
        setExibirModal(false);
      }
    }
  }

  function handleTxtTarefa(e) {
    setTarefa(e.target.value);
  }

  return (
    <div>
      <h3 className="text-center">Atualizar Tarefa</h3>
      <Jumbotron>
        <Form onSubmit={atualizar} noValidate validated={formValidado}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              data-testid="txt-tarefa"
              value={tarefa}
              onChange={handleTxtTarefa} />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-atualizar">
              Atualizar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light" onClick={voltar}>
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa atualizada com sucesso!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

AtualizarTarefa.propTypes = {
  id: PropTypes.number.isRequired
}

export default AtualizarTarefa;