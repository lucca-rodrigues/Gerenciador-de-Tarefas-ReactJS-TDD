import React from 'react';
import {useRoutes} from 'hookrouter';
import ListarTarefas from './Listar/listar-tarefas';
import CadastrarTarefas from './Cadastrar/cadastrar-tarefas';
import AtualizarTarefa from './Atualizar/atualizar-tarefa';

const routes = {
  '/': () => <ListarTarefas/>,
  '/cadastrar': () => <CadastrarTarefas/>,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id} />
}

function App() {
  return useRoutes(routes);
}

export default App;
