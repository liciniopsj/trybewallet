import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpense } from '../redux/actions';
import getCurrencies from '../services/getCurrencies';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleWalletFormInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleWalletFormBtn = async () => {
    const { dispatch } = this.props;
    const data = await getCurrencies();
    // console.log(data);
    dispatch(addExpense(this.state, data));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleWalletFormInput }
          />
        </label>
        {' '}
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleWalletFormInput }
          />
        </label>
        {' '}
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleWalletFormInput }
          >
            { currencies.map(($) => (<option key={ $ } value={ $ }>{ $ }</option>)) }
          </select>
        </label>
        {' '}
        <label htmlFor="method">
          Metodo de Pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleWalletFormInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        {' '}
        <label htmlFor="tag">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleWalletFormInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {' '}
        <button
          onClick={ this.handleWalletFormBtn }
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
