import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './concluir-tarefas';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import apiMock from 'axios';

describe('Teste do componente de remoção de tarefas', () => {

  const nomeTarefa = 'Tarefa de teste';
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it('deve exibir a modal', () => {
    const { getByTestId } = render(
      <RemoverTarefa
        tarefa={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('deve remover uma tarefa', async () => {
    const { getByTestId, findByTestId } = render(
      <RemoverTarefa
        tarefa={tarefa}
        recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('btn-remover'));
    await findByTestId('modal');
    expect(apiMock.delete).toHaveBeenCalledTimes(1); // Simula a requisição da API
  });

});

  
