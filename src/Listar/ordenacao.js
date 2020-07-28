import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import PropTypes from 'prop-types';

function Ordenacao(props) {

  return (
    <span>
        {/* MID */}
        {props.orderAsc || props.orderDesc ? (<span data-testid="mid"></span>) : (<FaSort data-testid="mid" />)}
        {/* TOP */}
        {props.orderAsc ? (<FaSortUp data-testid="up" />) : (<span data-testid="up"></span>)}
        {/* DOWN */}
        {props.orderDesc ? (<FaSortDown data-testid="down" />) : (<span data-testid="down"></span>)}
    </span>
  );

}

Ordenacao.propTypes = {
  orderAsc: PropTypes.bool.isRequired,
  orderDesc: PropTypes.bool.isRequired
}

export default Ordenacao;
