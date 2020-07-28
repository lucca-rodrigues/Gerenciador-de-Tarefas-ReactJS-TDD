import React from 'react';
import ReactDOM from 'react-dom';
import Ordenacao from './ordenacao';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de ordenação', () => {

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Ordenacao
        orderAsc={false}
        orderDesc={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a ordenação padrão', () => {
    const { getByTestId } = render(
      <Ordenacao orderAsc={false} orderDesc={false} />
    );
    fireEvent.click(getByTestId('mid'));
    fireEvent.click(getByTestId('up'));
    fireEvent.click(getByTestId('down'));
    //expect(getByTestId('FaSortDown')).toHaveClass('hidden');
  });

  it('deve exibir a ordenação ascendente', () => {
    const { getByTestId } = render(
      <Ordenacao orderAsc={true} orderDesc={false} />
    );
    fireEvent.click(getByTestId('mid'));
    fireEvent.click(getByTestId('up'));
    fireEvent.click(getByTestId('down'));
  });

  it('deve exibir a ordenação descendente', () => {
    const { getByTestId } = render(
      <Ordenacao orderAsc={false} orderDesc={true} />
    );
    fireEvent.click(getByTestId('mid'));
    fireEvent.click(getByTestId('up'));
    fireEvent.click(getByTestId('down'));
  });

});
