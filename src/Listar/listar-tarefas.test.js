import React from 'react'; 
import ReactDOM from 'react-dom'
import ListarTarefas from './listar-tarefas';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import apiMock from 'axios';

describe('Teste do componente de listagem de tarefas', () => {

    // Simula tarefas
    const nomePrimeiraTarefa = 'Primeira tarefa';
    const nomeSegundaTarefa = 'Segunda tarefa';
    const nomeTerceiraTarefa = 'Terceira tarefa';

    // Simula a API com 3 items
    const listaTarefas = {
      totalItens: 3,
      tarefas: [
        new Tarefa(1, nomePrimeiraTarefa, false),
        new Tarefa(2, nomeSegundaTarefa, false),
        new Tarefa(3, nomeTerceiraTarefa, false)
      ],
      pagina: 1
    };

    // Simula a Listagm de 3 itens da API
    it('deve exibir uma tabela contendo 3 tarefas', async () => {
      apiMock.get.mockResolvedValueOnce({ data: listaTarefas });
      const { findByTestId } = render(<ListarTarefas />);
      const tabela = await findByTestId('tabela');
      expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
      expect(tabela).toHaveTextContent(nomeSegundaTarefa);
      expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
    });
  
  
    // Simula o filtro de uma tarefa
    it('deve filtrar os dados da tabela de tarefas', async () => {
      apiMock.get.mockResolvedValueOnce({ data: listaTarefas });
      apiMock.get.mockResolvedValueOnce({ data: {
        totalItens: 1,
        tarefas: [ new Tarefa(1, nomePrimeiraTarefa, false) ],
        pagina: 1
      } });
      const { findByTestId } = render(<ListarTarefas />);
      fireEvent.change(await findByTestId('txt-tarefa'), { target: { value: nomePrimeiraTarefa }});
      const tabela = await findByTestId('tabela');
      expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
      expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
      expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);
    });
  });
  