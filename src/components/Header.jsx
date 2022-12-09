import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getTotalFieldValue = () => {
    const { expenses } = this.props;
    return expenses
      .reduce((pV, cV) => pV + cV.value * cV.exchangeRates[cV.currency].ask, 0);
    // pV = PreviousValue , cV = CurrentValue
  };

  render() {
    // const TOTAL_FIELD = 0;
    const HEADER_CURRENCY_FIELD = 'BRL';
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        {' '}
        <span>Despesa Total:</span>
        {' '}
        <span>R$</span>
        {' '}
        <span data-testid="total-field">{ (+this.getTotalFieldValue()).toFixed(2) }</span>
        {' '}
        <span data-testid="header-currency-field">{ HEADER_CURRENCY_FIELD }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
