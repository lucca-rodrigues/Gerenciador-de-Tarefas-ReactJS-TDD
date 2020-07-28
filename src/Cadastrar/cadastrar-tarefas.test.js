import React from 'react'; 
import ReactDOM from 'react-dom'
import CadastrarTarefas from './cadastrar-tarefas';
import { render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente de listagem de tarefas', () => {
    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CadastrarTarefas/>, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    it('Deve cadastrar uma nova tarefa sem erros', async () => {
        const { getByTestId, findByTestId } = render(<CadastrarTarefas />);

         // Testa um valor sendo digitado no Input
        fireEvent.change(getByTestId('text-tarefa'), {target: {value: 'Testar Este componente'}});
        // Simula o Clique do Botão cadastrar
        fireEvent.click(getByTestId('btn-cadastrar'));
        // Confere se no Modal tem a mensagem de Sucesso
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso'); 
        // Confere se esta mensagem existe no modal
        expect(modal).toHaveTextContent('Tarefa adicionada com sucesso!'); 
    });
    
})