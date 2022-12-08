import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAuth } from '../redux/actions';

const VALID_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValid: false,
  };

  loginInputValidation = () => {
    const { email, password } = this.state;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailFormat) && password.length >= VALID_PASSWORD_LENGTH) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  };

  handleLoginInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.loginInputValidation());
  };

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatch(userAuth(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isValid } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email-input"
              value={ email }
              onChange={ this.handleLoginInput }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password-input"
              value={ password }
              onChange={ this.handleLoginInput }
            />
          </label>
          <button disabled={ !isValid } type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
