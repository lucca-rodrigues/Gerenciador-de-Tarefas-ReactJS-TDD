import React from 'react';
import { FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types'
import {A} from 'hookrouter';
import ConcluirTarefas from './concluir-tarefas';
import RemoverTarefas from './remover-tarefas';

function ItensListaTarefas(props) {
  
  function tarefaConcluida(tarefa){
    return tarefa.concluida ? 'line-through' : 'none';
  }
  return(
    props.tarefas.map(tarefa => 
      <tr key={tarefa.id} data-testid="tarefa">
        <td width="50%"
          data-testid="tarefa-nome"
          style={{ textDecoration: tarefaConcluida(tarefa)}}
        >
          {tarefa.nome}
        </td>
        <td></td>
        <td className="text-right">
          {tarefa.concluida && tarefa.concluida === true ? '' : (
            <>
              <ConcluirTarefas
              tarefa={tarefa}
              carregarTarefas={props.carregarTarefas}
              className="pr-2"
              />
              <A href={`/atualizar/${tarefa.id}`}
                className={tarefa.concluida ? 'mr-2' : 'btn btn-warning btn-sm mr-2'}
              >
                <FaEdit size={20} color="#fff"/>
              </A>
            </>
          )}
          <RemoverTarefas
            tarefa={tarefa}
            carregarTarefas={props.carregarTarefas}
            className="ml-2"
          />
        </td>
      </tr>
    )
  );
}
ItensListaTarefas.propTypes = { 
  tarefas: PropTypes.array.isRequired,
  carregarTarefas: PropTypes.func.isRequired
}

export default ItensListaTarefas;