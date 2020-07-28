import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal} from 'react-bootstrap'; 
import { navigate, A } from 'hookrouter';
import Tarefa from '../Models/tarefa.model';
import api from '../services/api';
//

function CadastrarTarefas() {
  const [tarefa, setTarefa] = useState('');
  const [validacao, setValidacao] = useState(false);
  const [modal, setModal] = useState(false);


  async function handleSubmit(e){
    e.preventDefault();
    setValidacao(true);
    if (e.currentTarget.checkValidity() === true) {
      try{
        const novaTarefa = new Tarefa(null, tarefa, false); // Null para ID & tarefa = nova tarefa & false para o status de concluida.
        await api.post('/tarefas', novaTarefa);
        setModal(true);
      }catch(err){
        alert('Erro ao cadastrar tarefa, tente novamente em alguns instantes');
        setModal(false);
      }
    }
  }

  function handleValueTarefa(e){
    setTarefa(e.target.value);
  }

  function handleCloseModal(){
    // REDIRECIONA AUTOMATICAMENTE PARA A HOME
    navigate('/');
  }
  return (
    <div>
      <h3 className="text-center">Cadastrar</h3>
      <Jumbotron>
        <Form 
          validated={validacao}
          noValidate
          onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              value={tarefa}
              onChange={handleValueTarefa}
              data-testid="text-tarefa"
            />
             <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button
              variant="success"
              type="submit"
              data-testid="btn-cadastrar"
              >
                Cadastrar
              </Button>
              <A href="/" className="btn btn-light ml-3">Voltar</A>
          </Form.Group>
        </Form>
        <Modal show={modal} onHide={handleCloseModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa adicionada com sucesso!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

export default CadastrarTarefas