import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    const TEST = 'test';
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
        <label htmlFor="description-input">
          Descrição:
          <input type="text" name="description-input" id="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="currency-input"
            id="currency-input"
          >
            <option value={ TEST }>{ TEST }</option>
            <option value={ TEST }>{ TEST }</option>
            <option value={ TEST }>{ TEST }</option>
            <option value={ TEST }>{ TEST }</option>
            <option value={ TEST }>{ TEST }</option>
          </select>
        </label>
      </div>
    );
  }
}

export default WalletForm;
