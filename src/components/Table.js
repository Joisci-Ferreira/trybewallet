import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { expenses, deleteExt } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ (Number(expense.value)).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name}</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask
                    * (expense.value))}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => { deleteExt(expense.id); } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExt: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExt: (expenses) => {
    dispatch(deleteExpense(expenses));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
