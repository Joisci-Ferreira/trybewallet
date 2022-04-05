import React from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyAPI, addExpenses as getExpense, getAPIerror } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: 'Dez dólares',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  async handleClick(dispatch) {
    const { addExpenses } = this.props;
    const exchangeRates = await getCurrencyAPI();
    this.setState({
      exchangeRates,
    });
    addExpenses(this.state)
      .catch((error) => {
        dispatch(getAPIerror(error));
      });
  }

  render() {
    const { currencies } = this.props;
    const filterCurrency = currencies;
    const { id, value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
            name="valor"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="value-input"
            name="descricao"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:

          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            key={ id }
            onChange={ this.handleChange }
          >
            { filterCurrency.map((currencie) => (
              <option value={ currencie } key={ currencie }>{ currencie }</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(string).isRequired,
  addExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expenses) => dispatch(getExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
