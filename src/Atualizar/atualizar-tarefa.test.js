import React from 'react'; 
import ReactDOM from 'react-dom'
import AtualizarTarefas from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import apiMock from 'axios';

describe('Teste do componente de listagem de tarefas', () => {
	const tarefaId = 1;
	// Simula a atualzação de uma tarefa
    it('deve exibir a modal de sucesso ao atualizar uma tarefa', async () => {
		apiMock.get.mockResolvedValueOnce({ data: { nome: 'Estudar React' }});
		const { findByTestId } = render(<AtualizarTarefas id={tarefaId} />);
		fireEvent.click(await findByTestId('btn-atualizar'));
		const modal = await findByTestId('modal');
		expect(modal).toHaveTextContent('Sucesso');
	});
})