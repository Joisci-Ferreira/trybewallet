import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validate: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({
    target: { name, value },
  }) {
    this.setState({
      [name]: value,
    }, this.handleCheck);
  }

  handleClick(event) {
    event.preventDefault();

    const { history, saveEmail } = this.props;
    const { email } = this.state;

    saveEmail(email);
    history.push('/carteira');
  }

  handleCheck() {
    const { email, password } = this.state;
    const mimLetter = 6;
    const validateEmail = /\S+@\S+\.\S+/.test(email);
    const validatePassword = password.length >= mimLetter;

    if (validateEmail && validatePassword) {
      this.setState({
        validate: false,
      });
    } else {
      this.setState({
        validate: true,
      });
    }
  }

  render() {
    const { email, password, validate } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />

          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            disabled={ validate }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
