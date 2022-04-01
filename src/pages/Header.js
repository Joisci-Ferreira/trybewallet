import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.generatedExpense = this.generatedExpense.bind(this);
  }

  generatedExpense() {
    const { expenses } = this.props;
    const INITIAL_CURRENCIES = 'USD';
    const total = expenses.reduce((acc, expense) => {
      const { exchangeRates, value, currency = INITIAL_CURRENCIES } = expense;
      const sum = exchangeRates[currency].ask;
      return acc + (sum * value);
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <div>
          <p data-testid="total-field">
            Despesa Total: R$
            {' '}
            { this.generatedExpense() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
