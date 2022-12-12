import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const {
      currencies,
      value,
      description,
      currency,
      method,
      tag,
      handleWalletFormInput,
      handleWalletFormBtn,
      editor,
    } = this.props;

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
            onChange={ handleWalletFormInput }
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
            onChange={ handleWalletFormInput }
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
            onChange={ handleWalletFormInput }
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
            onChange={ handleWalletFormInput }
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
            onChange={ handleWalletFormInput }
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
          onClick={ handleWalletFormBtn }
          type="button"
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
  handleWalletFormInput: PropTypes.func,
  handleWalletFormBtn: PropTypes.func,
  btnLabel: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
