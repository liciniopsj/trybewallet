import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteBtn = (elementId) => {
    const { dispatch, expenses } = this.props;
    // console.log(expenses);
    const filteredExpenses = expenses.filter((e) => e.id !== elementId);
    // console.log(filteredExpenses);
    dispatch(deleteExpense(filteredExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .map((e) => (
                  <tr key={ e.id }>
                    <td>{`${e.description}`}</td>
                    <td>{`${e.tag}`}</td>
                    <td>{`${e.method}`}</td>
                    <td>{`${(+e.value).toFixed(2)}`}</td>
                    <td>{`${e.exchangeRates[e.currency].name}`}</td>
                    <td>{`${(+e.exchangeRates[e.currency].ask).toFixed(2)}`}</td>
                    <td>
                      {`${(+e.exchangeRates[e.currency].ask * +e.value)
                        .toFixed(2)}`}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => { this.handleDeleteBtn(e.id); } }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
