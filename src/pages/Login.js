import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    isButtonDisabled: true,
    inputLogin: '',
    loading: false,
  }

  handleOnChangeLogin = ({ target }) => {
    const { name, value } = target;
    console.log(target.name);
    this.setState({ [name]: value },
      () => this.validateLogin());
  }

  validateLogin = () => {
    const { inputLogin } = this.state;
    const minLength = 3;

    if (inputLogin.length >= minLength) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  }

  loginButton = async () => {
    const { inputLogin } = this.state;
    const { history } = this.props;
    this.setState(() => ({ loading: true }));
    await createUser({ name: inputLogin });
    history.push('search');
  }

  render() {
    const { isButtonDisabled, loading, inputLogin } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <p>Carregando...</p> : (

          <>
            <label htmlFor="inputLogin">
              Usuário
              <input
                value={ inputLogin }
                name="inputLogin"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleOnChangeLogin }
              />
            </label>
            <button
              type="button"
              disabled={ isButtonDisabled }
              data-testid="login-submit-button"
              onClick={ this.loginButton }
            >
              Entrar
            </button>
          </>
        )}
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};
