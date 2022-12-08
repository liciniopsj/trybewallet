import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const TOTAL_FIELD = 0;
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
        <span data-testid="total-field">{ TOTAL_FIELD }</span>
        {' '}
        <span data-testid="header-currency-field">{ HEADER_CURRENCY_FIELD }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
