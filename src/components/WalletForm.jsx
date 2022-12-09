import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    console.log('componentdidmount');
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            type="number"
            name="value-input"
            id="value-input"
          />
        </label>
        {' '}
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description-input"
            id="description-input"
          />
        </label>
        {' '}
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="currency-input"
            id="currency-input"
          >
            { currencies.map((e) => (<option key={ e } value={ e }>{ e }</option>)) }
          </select>
        </label>
        {' '}
        <label htmlFor="method-input">
          Metodo de Pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method-input"
            id="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de crédito</option>
            <option value="Cartão de Débito">Cartão de débito</option>
          </select>
        </label>
        {' '}
        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            name="tag-input"
            id="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
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
