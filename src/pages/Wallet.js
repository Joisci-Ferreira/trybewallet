import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import ExpenseForm from '../components/ExpenseForm';
import { fetchCurrencies } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch();
  }

  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
